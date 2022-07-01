import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './to-do-input.component.html',
  styleUrls: ['./to-do-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoInputComponent {
  @Output() onAddTodo: EventEmitter<string> = new EventEmitter<string>();
  newToDo = '';

  addTodo(): void {
    if (!this.newToDo) {
      return;
    }

    this.onAddTodo.emit(this.newToDo);
    this.newToDo = '';
  }
}
