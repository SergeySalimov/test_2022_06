import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  map,
  Observable,
  pluck,
  Subscription,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FollowTodosService, ToDoService } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { PING_POLL_STATUS_INTERVAL, CLEAR_FILTER } from '@core/constants';
import { FollowType } from '@app/pages/to-do-page/to-do-page.interface';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoPageComponent implements OnInit, OnDestroy {
  private _filters$: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(CLEAR_FILTER);
  public filters$: Observable<IFilter> = this._filters$.asObservable();
  private _todoList$: BehaviorSubject<Array<TodoListItemDto>> = new BehaviorSubject<Array<TodoListItemDto>>([]);
  public todoList$: Observable<Array<TodoListItemDto>> = this._todoList$.asObservable();

  todoListFiltered$: Observable<TodoListItemDto[]> = combineLatest([
    this.todoList$,
    this.filters$,
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

  followedTodos$: Observable<string[]> = this.followTodosService.followedTodos$.pipe(
    tap((data) => {
      if (data.length === 0 && this.intervalSubscription) {
        this.stopPingServer();
      }
    }),
  );

  statusEnum$: Observable<StatusEnumDto[]> = this.route.data.pipe(
    pluck('statusEnum'),
    tap(statusEnums => {
      const expiredEnum: StatusEnumDto | undefined = statusEnums.find(item => /EXPIRED/i.test(item.key));
      this.expiredStatusValue = expiredEnum ? expiredEnum.value : 2;
    }),
  );

  expiredStatusValue!: number;
  private intervalSubscription!: Subscription;
  private getAllSubscription!: Subscription;
  private removeItemSubscription!: Subscription;
  private addItemSubscription!: Subscription;

  constructor(
    private readonly todoService: ToDoService,
    private readonly followTodosService: FollowTodosService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      pluck('todos'),
      take(1),
    ).subscribe((todoList: TodoListItemDto[]) => {
      this._todoList$.next(todoList);
    });
  }

  onAddTodo(description: string): void {
    this.addItemSubscription = this.todoService.addTodoItem(description).pipe(
      withLatestFrom(this.filters$),
      switchMap(([_, filters]) => this.todoService.getAllTodos(filters)),
    ).subscribe(todosList => {
      this._todoList$.next(todosList);
    });
  }

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

  onChangeFollowAll(type: FollowType): void {
    if (type === 'stop') {
      this.followTodosService.clearFollowIds();
      this.stopPingServer();
      return;
    }

    const ids: string[] = this._todoList$.getValue()
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
      this._todoList$.next(todos);
    }
  }

  //Filtering block
  onChangeFilters(filters: IFilter): void {
    this._filters$.next(filters);

    if (this.getAllSubscription && !this.getAllSubscription.closed) {
      this.getAllSubscription.unsubscribe();
    }

    this.getAllSubscription = this.todoService.getAllTodos(filters).subscribe((todosList: TodoListItemDto[]) => {
      this._todoList$.next(todosList);
    });
  }

  //other
  onDeleteItem(id: string): void {
    this.removeItemSubscription = this.todoService.removeTodoItem(id).pipe(
      tap(deletedTodo => this.followTodosService.removeFollowedFromList(deletedTodo.id)),
      withLatestFrom(this.filters$),
      switchMap(([_, filters]: [TodoListItemDto, IFilter]) => this.todoService.getAllTodos(filters)),
    ).subscribe((todosList: TodoListItemDto[]) => {
      this._todoList$.next(todosList);
    });
  }

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
    this.addItemSubscription?.unsubscribe();
    this.removeItemSubscription?.unsubscribe();
  }
}
