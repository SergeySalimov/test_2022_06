import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLEAR_FILTER, FollowTodosService, ToDoService } from '@core/services';
import { combineLatest, interval, map, Observable, Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FollowType } from '@app/pages/to-do-page/to-do-table/to-do-table.interface';
import { PING_POLL_STATUS_INTERVAL } from '@core/constants';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  todos$: Observable<TodoListItemDto[]> = this.todoService.todoList$;
  // showTodos$: Observable<boolean> = this.todoService.todoList$.pipe(
  //   map(todos => todos ?? []),
  //   map(todos => todos.length > 0),
  // );

  todoListFiltered$: Observable<TodoListItemDto[]> = combineLatest([
    this.todoService.todoList$,
    this.todoService.filters$,
  ]).pipe(
    map(([todos, filters]: [TodoListItemDto[], IFilter]) => todos.filter(todo =>
      [
        filters.dateFrom === null ? true : new Date(filters.dateFrom) <= new Date(todo.createdAt),
        filters.dateTill === null ? true : new Date(filters.dateTill) >= new Date(todo.createdAt),
        filters.description === null ? true : new RegExp(filters.description, 'g').test(todo.description),
        filters.status === 'null' || filters.status === null ? true : todo.pollStatus === +filters.status,
      ]
        .every(filter => filter)),
    ),
  );

  statusEnum$: Observable<StatusEnumDto[]> = this.todoService.statusEnum$;

  filters$: Observable<IFilter> = this.todoService.filters$.pipe(
    map(filters => filters ?? CLEAR_FILTER),
  );

  followedTodos$: Observable<string[]> = this.followTodosService.followedTodos$.pipe(
    tap((data) => {
      if (data.length === 0 && this.intervalSubscription) {
        this.stopPingServer();
      }
    }),
  );

  clearFilter: IFilter = CLEAR_FILTER;
  expiredStatusValue: number = this.todoService.getExpiredStatusValue() ?? 2;
  private intervalSubscription!: Subscription;

  constructor(
    private readonly todoService: ToDoService,
    private readonly followTodosService: FollowTodosService,
  ) {}

  //Follow Block
  startPingServer(): void {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      return;
    }

    this.intervalSubscription = interval(PING_POLL_STATUS_INTERVAL).pipe(
      withLatestFrom(this.followedTodos$),
      switchMap(([_, followedTodos]) => this.todoService.checkStatus(followedTodos)),
      withLatestFrom(this.todoListFiltered$),
    ).subscribe(([data, todos]: [PollStatusListDto[], TodoListItemDto[]]) => {
      this.refreshPollStatus(data, todos);
    });
  }

  stopPingServer(): void {
    this.intervalSubscription?.unsubscribe();
  }

  onFollowItem(id: string): void {
    this.followTodosService.changeFollowStatus(id);

    if (!this.followTodosService.isFollowedExists() || (this.intervalSubscription && !this.intervalSubscription.closed)) {
      return;
    }

    this.startPingServer();
  }

  onChangeFollowAll(todos: TodoListItemDto[], type: FollowType): void {
    if (type === 'stop') {
      this.followTodosService.clearFollowIds();
      this.stopPingServer();
      return;
    }

    const ids: string[] = todos
      .filter(todo => todo.pollStatus !== this.expiredStatusValue)
      .map(todo => todo.id);

    this.followTodosService.addIdsToFollow(ids);
    this.startPingServer();
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
      if (todo.pollStatus === this.expiredStatusValue) {
        this.followTodosService.removeFollowedFromList(todo.id);
      }
    }

    if (changed) {
      this.todoService.updateTodosWithoutServer(todos);
    }
  }

  //Filtering block
  onChangeFilters(filters: IFilter): void {
    this.todoService.changeFilters(filters);
  }

  //other
  onDeleteItem(id: string): void {
    this.todoService.removeTodoItem(id)
      .subscribe(() => this.followTodosService.removeFollowedFromList(id));
  }
}
