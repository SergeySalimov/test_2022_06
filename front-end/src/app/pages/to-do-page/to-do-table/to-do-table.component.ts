import { ChangeDetectionStrategy, Component, Inject, TrackByFunction } from '@angular/core';
import { AppRoutes, ToDoService } from '@core/services';
import { interval, Observable, Subscription, switchMap, withLatestFrom } from 'rxjs';
import { dateTimeFormatToken } from '@shared/shared.module';
import { trackById } from '@shared/utils';
import { PollStatusListDto, TodoListItemDto } from '@common/interfaces';
import { PollStatusEnum } from '@app/core/constants/poll.enum';
import { PING_POLL_STATUS_INTERVAL } from '@core/constants';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  todoList$: Observable<Array<TodoListItemDto>> = this.todoService.todoList$;
  trackByFunction: TrackByFunction<any> = trackById;
  followedTodos: string[] = [];
  private intervalSubscription!: Subscription;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
  ) {}

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  onDeleteItem(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.todoService.removeTodoItem(id).subscribe(() => this.clearFollowedOnExpire(id));
  }

  stopPingServer(): void {
    this.intervalSubscription?.unsubscribe();
  }

  clearFollowedOnExpire(expiredTodoId: string): void {
    const index: number = this.followedTodos.indexOf(expiredTodoId);

    if (index !== -1) {
      this.followedTodos.splice(index, 1);

      if (this.followedTodos.length === 0) {
        this.stopPingServer();
      }
    }
  }

  refreshPollStatus(status: PollStatusListDto[], todos: TodoListItemDto[]): void {
    let changed = false;

    for (const todo of todos) {
      const todoStatus: PollStatusListDto|undefined = status.find(item => item.id === todo.id);

      if (!todoStatus || todo.pollStatus === todoStatus.pollStatus) {
        continue;
      }

      changed = true;
      todo.pollStatus = todoStatus.pollStatus;

      if (todo.pollStatus === PollStatusEnum.EXPIRED) {
        this.clearFollowedOnExpire(todo.id);
      }
    }

    if (changed) {
      this.todoService.updateTodosWithoutServer(todos);
    }
  }

  onFollowItem(event: MouseEvent, id: string): void {
    event.stopPropagation();

    const index: number = this.followedTodos.indexOf(id);
    index === -1 ? this.followedTodos.push(id) : this.followedTodos.splice(index, 1);

    if (this.followedTodos.length === 0 && this.intervalSubscription) {
      this.stopPingServer();
      return;
    }

    if (!this.intervalSubscription || this.intervalSubscription.closed) {
      this.intervalSubscription = interval(PING_POLL_STATUS_INTERVAL).pipe(
        switchMap(() => this.todoService.checkStatus(this.followedTodos)),
        withLatestFrom(this.todoList$),
      ).subscribe(([data, todos] : [PollStatusListDto[], TodoListItemDto[]]) => {
        this.refreshPollStatus(data, todos);
      });
    }
  }

  isTodoFollowed(id: string): boolean {
    return this.followedTodos.includes(id);
  }

  isTodoExpired(todo: TodoListItemDto): boolean {
    return todo.pollStatus === PollStatusEnum.EXPIRED;
  }
}
