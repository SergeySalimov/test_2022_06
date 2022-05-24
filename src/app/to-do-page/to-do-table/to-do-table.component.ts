import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoService } from "../../service/to-do.service";
import { Observable } from "rxjs";
import textField from '../../../assets/textField.json';
import { TodoListItem } from "../../shared/interface/to-do-page.interface";

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  textField: any = textField;
  todoList$: Observable<Array<TodoListItem>> = this.todoService.todoList$;
  tableHeader: string[] = [
    this.textField.todo.tableDate,
    this.textField.todo.tableDescription,
    this.textField.todo.tableAction,
  ];

  constructor(private readonly todoService: ToDoService) {
  }

  onDeleteItem(index: number): void {
    this.todoService.removeTodoItem(index);
  }
}