import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoService } from '@core/services';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './to-do-input.component.html',
  styleUrls: ['./to-do-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoInputComponent {
  newToDo = '';

  constructor(private readonly todoService: ToDoService) {}

  onAddTodo(): void {
    if (!this.newToDo) {
      return;
    }

    this.todoService.addTodoItem(this.newToDo);
    this.newToDo = '';
  }
}
