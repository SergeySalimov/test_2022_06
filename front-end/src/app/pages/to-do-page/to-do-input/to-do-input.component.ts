import { ChangeDetectionStrategy, Component } from '@angular/core';
import textFiled from '@textField';
import { ToDoService } from '@core/services';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './to-do-input.component.html',
  styleUrls: ['./to-do-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoInputComponent {
  textField = textFiled;
  newToDo = '';

  constructor(private readonly todoService: ToDoService) {
  }

  onAddTodo(): void {
    this.todoService.addTodoItem(this.newToDo);
    this.newToDo = '';
  }
}
