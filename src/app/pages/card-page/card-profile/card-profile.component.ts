import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { TodoListItem } from '../../../shared/interfaces/to-do-page.interface';
import textField from '../../../../assets/textField.json';
import { AppRoutes } from '../../../app-routing.helper';
import { InputConfigInterface, PossibleInputType } from '../../../shared/interfaces/input-config.interface';
import { TextFieldInterface } from '../../../shared/interfaces/text-field.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import { ToDoService } from '../../../services/to-do.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProfileComponent implements OnInit {
  @Input() todoItem!: TodoListItem | null;
  @Input() inputsConfigForLeft!: Array<InputConfigInterface>;
  @Input() inputsConfigForRight!: Array<InputConfigInterface>;

  cardForm!: FormGroup;
  textField: TextFieldInterface = textField;
  editMode = true;
  route: typeof AppRoutes = AppRoutes;
  formSubmitted = false;

  @ViewChild('form') formRef!: ElementRef;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
  ) {
  }

  ngOnInit(): void {
    this.createCardForm();
  }

  getTodoValue(todo: TodoListItem, config: InputConfigInterface): PossibleInputType {
    return todo[config.keyForValue] ?? null;
  }

  getFormControl(controlName: string): FormControl {
    return this.cardForm?.controls[controlName] as FormControl;
  }

  changeEditMode(status: boolean): void {
    this.editMode = status;

    if (!status) {
      this.cardForm.reset();
      this.cardForm.patchValue(this.todoItem!);
    }
  }

  onSubmitForm(): void {
    this.formSubmitted = true;

    if (this.cardForm.invalid) {
      return;
    }

    const formValue: Partial<TodoListItem> = this.cardForm.getRawValue();
    this.todoService.updateTodoItem({ ...this.todoItem, ...formValue } as TodoListItem);
    this.editMode = false;
    this.cardForm.markAsPristine();
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
  }
}
