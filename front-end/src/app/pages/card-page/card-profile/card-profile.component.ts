import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputConfigInterface, PossibleInputType } from '@core/interfaces';
import { AppRoutes, ToDoService } from '@core/services';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListItemDto } from '@common/interfaces';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProfileComponent implements OnChanges {
  @Input() todoItem!: TodoListItemDto | null;
  @Input() inputsConfigForLeft!: Array<InputConfigInterface>;
  @Input() inputsConfigForRight!: Array<InputConfigInterface>;

  cardForm!: FormGroup;
  appRoutes: typeof AppRoutes = AppRoutes;
  formSubmitted = false;

  constructor(
    private readonly todoService: ToDoService,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('todoItem' in changes && changes['todoItem'].currentValue) {
      this.createCardForm();
    }
  }

  getTodoValue(todo: TodoListItemDto, config: InputConfigInterface): PossibleInputType {
    return todo[config.keyForValue] ?? null;
  }

  getEditMode(): boolean {
    return this.route.snapshot.queryParams['editMode'] === 'true';
  }

  getFormControl(controlName: string): FormControl {
    return this.cardForm?.controls[controlName] as FormControl;
  }

  cancelEditing(): void {
    this.cardForm.patchValue(this.todoItem!);
    this.changeEditMode(false)
  }

  changeEditMode(editMode: boolean): void {
    this.router.navigate(
      [],
      { queryParams: { editMode }, relativeTo: this.route });
  }

  onSubmitForm(): void {
    this.formSubmitted = true;

    if (this.cardForm.invalid) {
      return;
    }

    const formValue: Partial<TodoListItemDto> = this.cardForm.getRawValue();
    this.todoService.updateTodoItem({ ...this.todoItem, ...formValue } as TodoListItemDto).pipe(
      take(1),
    ).subscribe({
      next: (data: TodoListItemDto) => {
        this.todoItem = data;
        this.changeEditMode(false);
        this.cdr.markForCheck();
      },
      error: () => this.changeEditMode(true),
    });
  }

  private getValueForFormControl(config: InputConfigInterface): PossibleInputType {
    if (!this.todoItem || !(config.keyForValue in this.todoItem!)) {
      return null;
    }

    return this.todoItem[config.keyForValue] as PossibleInputType;
  }

  private createCardForm(): void {
    if (!this.todoItem) {
      return;
    }

    this.cardForm = new FormGroup(
      [...this.inputsConfigForLeft, ...this.inputsConfigForRight]
        .reduce((acc: Record<keyof TodoListItemDto, FormControl>, config: InputConfigInterface) => ({
          ...acc,
          [config.keyForValue]: new FormControl(
            {
              value: this.getValueForFormControl(config),
              disabled: !config.editable,
            },
            config.validators ?? null
          ),
        }), {} as Record<keyof TodoListItemDto, FormControl>)
    );
  }
}
