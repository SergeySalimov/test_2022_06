import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoService } from '@core/services';
import { Observable } from 'rxjs';
import { Unsubscribe } from '@shared/utils';
import { TodoListItemDto } from '@common/interfaces';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Unsubscribe()
export class ToDoTableComponent {
  todoList$: Observable<TodoListItemDto[]> = this.todoService.todoList$;
  constructor(private readonly todoService: ToDoService) {}
}
