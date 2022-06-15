import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ToDoPageService } from '@app/pages/to-do-page/to-do-page.service';
import { ToDoService } from '@core/services';
import { Observable } from 'rxjs';
import { TodoListItemDto } from '@common/interfaces';
import { PollStatusEnum } from '@app/core/constants/poll.enum';

@Component({
  selector: 'app-to-do-table-filter',
  templateUrl: './to-do-table-filter.component.html',
  styleUrls: ['./to-do-table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableFilterComponent {
  @Output() startFollowAllEmit: EventEmitter<void> = new EventEmitter<void>();

  todos$: Observable<TodoListItemDto[]> = this.todoService.todoList$;

  constructor(
    private readonly todoService: ToDoService,
    private readonly todoPageService: ToDoPageService,
    ) {}

  onFollowAll(e: MouseEvent, todos: TodoListItemDto[]): void {
    e.stopPropagation();
    const ids: string[] = todos
      .filter(todo => todo.pollStatus !== PollStatusEnum.EXPIRED)
      .map(todo => todo.id);

    this.todoPageService.startFollowAll(ids);
    this.startFollowAllEmit.emit();
  }

  onStopFollowAll(e: MouseEvent): void {
    e.stopPropagation();
    this.todoPageService.stopFollowAll();
  }
}
