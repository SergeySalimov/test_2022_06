import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { interval, Observable, Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
import { PollStatusEnum } from '@app/core/constants/poll.enum';
import { AppRoutes, ToDoService } from '@core/services';
import { PING_POLL_STATUS_INTERVAL } from '@core/constants';
import { trackById } from '@shared/utils';
import { dateTimeFormatToken } from '@shared/shared.module';
import { PollStatusListDto, TodoListItemDto } from '@common/interfaces';
import { ToDoPageService } from '@app/pages/to-do-page/to-do-page.service';

@Component({
  selector: 'app-to-do-table-body',
  templateUrl: './to-do-table-body.component.html',
  styleUrls: ['./to-do-table-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableBodyComponent implements OnInit, OnDestroy {
  todoList$: Observable<TodoListItemDto[]> = this.todoService.todoList$;
  followedTodos: string[] = [];
  trackByFunction: TrackByFunction<any> = trackById;
  private intervalSubscription!: Subscription;
  private followedSubscription!: Subscription;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
    private readonly todoPageService: ToDoPageService,
  ) {}

  ngOnInit(): void {
    this.todoPageService.followedTodos$.subscribe((data: string[]) => {
      this.followedTodos = [...data];

      if (this.followedTodos.length === 0 && this.intervalSubscription) {
        this.stopPingServer();
      }
    });
  }

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  isTodoFollowed(id: string): boolean {
    return this.followedTodos.includes(id);
  }

  isTodoExpired(todo: TodoListItemDto): boolean {
    return todo.pollStatus === PollStatusEnum.EXPIRED;
  }

  stopPingServer(): void {
    this.intervalSubscription?.unsubscribe();
  }

  refreshPollStatus(status: PollStatusListDto[], todos: TodoListItemDto[]): void {
    let changed = false;

    for (const todo of todos) {
      const todoStatus: PollStatusListDto | undefined = status.find(item => item.id === todo.id);
      if (!todoStatus || todo.pollStatus === todoStatus.pollStatus) {
        continue;
      }

      changed = true;
      todo.pollStatus = todoStatus.pollStatus;
      if (todo.pollStatus === PollStatusEnum.EXPIRED) {
        this.todoPageService.removeFollowedFromList(todo.id);
      }
    }

    if (changed) {
      this.todoService.updateTodosWithoutServer(todos);
    }
  }

  onDeleteItem(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.todoService.removeTodoItem(id).pipe(
      tap(() => this.todoPageService.removeFollowedFromList(id)),
    ).subscribe();
  }

  onFollowItem(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.todoPageService.changeFollowStatus(id);

    if (!this.todoPageService.isFollowedExists() || (this.intervalSubscription && !this.intervalSubscription.closed)) {
      return;
    }

    this.intervalSubscription = interval(PING_POLL_STATUS_INTERVAL).pipe(
      switchMap(() => this.todoService.checkStatus(this.followedTodos)),
      withLatestFrom(this.todoList$),
    ).subscribe(([data, todos]: [PollStatusListDto[], TodoListItemDto[]]) => {
      this.refreshPollStatus(data, todos);
    });
  }

  ngOnDestroy(): void {
    this.stopPingServer();
    this.followedSubscription?.unsubscribe();
  }
}
