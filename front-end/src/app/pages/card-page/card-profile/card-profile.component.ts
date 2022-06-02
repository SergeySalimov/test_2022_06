import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TodoListItem } from '../../../core/interfaces/to-do-page.interface';
import textField from '../../../../assets/textField.json';
import { AppRoutes } from '../../../app-routing.helper';
import { InputConfigInterface, PossibleInputType } from '../../../core/interfaces/input-config.interface';
import { TextFieldInterface } from '../../../core/interfaces/text-field.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import { ToDoService } from '../../../core/services/to-do.service';
import { inputConfig } from '../card-page.config';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProfileComponent implements OnChanges {
  @Input() todoItem!: TodoListItem | null;
  @Input() inputsConfigForLeft!: Array<InputConfigInterface>;
  @Input() inputsConfigForRight!: Array<InputConfigInterface>;

  cardForm!: FormGroup;
  textField: TextFieldInterface = textField;
  editMode = false;
  route: typeof AppRoutes = AppRoutes;
  formSubmitted = false;

  @ViewChild('form') formRef!: ElementRef;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
    private readonly router: Router,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todoItem'].firstChange && 'todoItem' in changes && changes['todoItem'].currentValue) {
      this.createCardForm();
    }
  }

  getTodoValue(todo: TodoListItem, config: InputConfigInterface): PossibleInputType {
    return todo[config.keyForValue] ?? null;
  }

  getFormControl(controlName: string): FormControl {
    return this.cardForm?.controls[controlName] as FormControl;
  }

  cancelEditing(): void {
    this.cardForm.patchValue(this.todoItem!);
    this.changeEditMode(false);
  }

  changeEditMode(status: boolean): void {
    this.editMode = status;
    status ? this.enableForm() : this.disableForm();
  }

  onSubmitForm(): void {
    this.formSubmitted = true;

    if (this.cardForm.invalid) {
      return;
    }

    const formValue: Partial<TodoListItem> = this.cardForm.getRawValue();
    this.todoService.updateTodoItem({ ...this.todoItem, ...formValue } as TodoListItem).pipe(
      take(1),
    ).subscribe({
      next: (data: TodoListItem) => {
        this.todoItem = data;
        this.changeEditMode(false);
      },
      error: () => this.changeEditMode(true),
    });
  }

  private disableForm(): void {
    for (const key in this.cardForm.controls) {
      const index: number = inputConfig.findIndex(config => config.keyForValue === key);
      this.cardForm.controls[key].value?.trim();

      // if (index >=0 && inputConfig[index].inputType === InputTypeEnum.NUMBER) {
      //   let value = this.cardForm.controls[key].value.replace(/\D+/g, '');
      //   this.cardForm.controls[key].setValue(value);
      //   continue;
      // }

      if (!this.cardForm.controls[key].value) {
        this.cardForm.controls[key].setValue(null);
      }
    }

    this.cardForm.disable();
  }

  private enableForm(): void {
    for (const key in this.cardForm.controls) {
      const index: number = inputConfig.findIndex(config => config.keyForValue === key);

      if (index >= 0 && inputConfig[index].editable) {
        this.cardForm.controls[key].enable();
      }
    }
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
        .reduce((acc: Record<keyof TodoListItem, FormControl>, config: InputConfigInterface) => ({
          ...acc,
          [config.keyForValue]: new FormControl(
            {
              value: this.getValueForFormControl(config),
              disabled: !config.editable,
            },
            config.validators ?? null
          ),
        }), {} as Record<keyof TodoListItem, FormControl>)
    );

    this.editMode ? this.enableForm() : this.disableForm();
  }
}
