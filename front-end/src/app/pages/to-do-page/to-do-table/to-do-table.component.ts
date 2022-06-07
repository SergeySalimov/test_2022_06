import { ChangeDetectionStrategy, Component, Inject, TrackByFunction } from '@angular/core';
import { AppRoutes, ToDoService } from '@core/services';
import { Observable } from 'rxjs';
import { TodoListItem } from '@core/interfaces';
import { dateTimeFormatToken } from '@shared/shared.module';
import { trackById } from '@shared/utils';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  todoList$: Observable<Array<TodoListItem>> = this.todoService.todoList$;
  trackByFunction: TrackByFunction<any> = trackById;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
  ) {}

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  onDeleteItem(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.todoService.removeTodoItem(id);
  }
}
