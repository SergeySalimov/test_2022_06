import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoListItem } from '../../../shared/interfaces/to-do-page.interface';
import textField from '../../../../assets/textField.json';
import { AppRoutes } from '../../../app-routing.helper';
import {
  InputConfigInterface,
  PipeTypeEnum,
  PossibleInputType
} from '../../../shared/interfaces/input-config.interface';
import { TextFieldInterface } from '../../../shared/interfaces/text-field.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import { ToDoService } from '../../../services/to-do.service';
import { inputConfig } from '../card-page-input.config';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProfileComponent implements OnChanges {
  @Input() todoItem!: TodoListItem | null;
  @Input() inputsConfigForLeft!: Array<InputConfigInterface>;
  @Input() inputsConfigForRight!: Array<InputConfigInterface>;

  cardForm!: FormGroup;
  textField: TextFieldInterface = textField;
  editMode = true;
  route: typeof AppRoutes = AppRoutes;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly datePipe: DatePipe,
    private readonly todoService: ToDoService,
    ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('todoItem' in changes && 'inputsConfigForLeft' in changes && 'inputsConfigForRight' in changes) {
      this.createCardForm();
    }
  }

  getTodoValue(todo: TodoListItem, config: InputConfigInterface): PossibleInputType {
    return todo[config.keyForValue] ?? null;
  }

  getFormControl(controlName: string): any {
    return this.cardForm?.controls[controlName] as FormControl;
  }

  onSaveForm(): void {
    const formValue: Partial<TodoListItem> = this.cardForm.getRawValue();

    for (let [key, value] of Object.entries(formValue)) {
      const configForControl: InputConfigInterface | undefined = inputConfig.find(config => config.keyForValue === key);

      if (configForControl && !configForControl.editable || value === null) {
        delete (formValue as any)[key];
      }
    }

    this.todoService.updateTodoItem({ ...this.todoItem, ...formValue } as TodoListItem);
    this.editMode = false;
    this.cardForm.markAsPristine();
  }

  private getValueForFormControl(config: InputConfigInterface): string | null {
    if (!this.todoItem || !(config.keyForValue in this.todoItem!)) {
      return null;
    }

    return config?.pipe !== PipeTypeEnum.DATE
      ? `${this.todoItem[config.keyForValue]}`
      : this.datePipe.transform(this.todoItem![config.keyForValue], this.dateTimeFormat);
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
