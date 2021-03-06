import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, pluck, Subscription, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { IFilter, ISort, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FollowTodosService, ToDoService } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { CLEAR_FILTER, DEFAULT_SORT, PING_POLL_STATUS_INTERVAL } from '@core/constants';
import { FollowType } from '@app/pages/to-do-page/to-do-page.interface';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoPageComponent implements OnInit, OnDestroy {
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

  filters: IFilter = CLEAR_FILTER;
  sorting: ISort = DEFAULT_SORT;
  todosListFiltered: TodoListItemDto[] = [];
  expiredStatusValue!: number;
  private intervalSubscription!: Subscription;
  private getAllSubscription!: Subscription;
  private removeItemSubscription!: Subscription;
  private addItemSubscription!: Subscription;

  constructor(
    private readonly todoService: ToDoService,
    private readonly followTodosService: FollowTodosService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      pluck('todos'),
      take(1),
    ).subscribe((todosList: TodoListItemDto[]) => {
      this.todosListFiltered = [...todosList];
    });
  }

  onAddTodo(description: string): void {
    this.addItemSubscription = this.todoService.addTodoItem(description).pipe(
    ).subscribe(() => this.refreshTodos());
  }

  //Follow Block
  startPingServer(): void {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      return;
    }

    this.intervalSubscription = interval(PING_POLL_STATUS_INTERVAL).pipe(
      withLatestFrom(this.followedTodos$),
      switchMap(([_, followedTodos]) => this.todoService.checkStatus(followedTodos)),
    ).subscribe((pollStatus: PollStatusListDto[]) => {
      this.refreshPollStatus(pollStatus);
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

  noItemToFollow(): boolean {
    return this.todosListFiltered
      .filter(todo => todo.pollStatus !== this.expiredStatusValue)
      .map(todo => todo.id)
      .length === 0;
  }

  onChangeFollowAll(type: FollowType): void {
    if (type === 'stop') {
      this.followTodosService.clearFollowIds();
      this.stopPingServer();
      return;
    }

    const ids: string[] = this.todosListFiltered
      .filter(todo => todo.pollStatus !== this.expiredStatusValue)
      .map(todo => todo.id);

    if (ids.length === 0) {
      return;
    }

    this.followTodosService.addIdsToFollow(ids);
    this.startPingServer();
  }

  private refreshPollStatus(status: PollStatusListDto[]): void {
    this.todosListFiltered = this.todosListFiltered.map(todo => {
      const index: number = status.findIndex(item => item.id === todo.id);

      if (index === -1 || todo.pollStatus === status[index].pollStatus) {
        return { ...todo };
      }

      if (status[index].pollStatus === this.expiredStatusValue) {
        this.followTodosService.removeFollowedFromList(todo.id);
      }

      return {
        ...todo,
        pollStatus: status[index].pollStatus,
      };
    });

    this.cdr.markForCheck();
  }

  //Filtering block
  onChangeFilters(filters: IFilter): void {
    this.filters = filters;
    this.refreshTodos();
  }

  //Sorting block
  sortChange(sort: ISort): void {
    this.sorting = sort;
    this.refreshTodos();
  }

  //other
  onDeleteItem(id: string): void {
    this.removeItemSubscription = this.todoService.removeTodoItem(id).pipe(
      tap(deletedTodo => this.followTodosService.removeFollowedFromList(deletedTodo.id)),
    ).subscribe(() => this.refreshTodos());
  }

  private refreshTodos(): void {
    if (this.getAllSubscription && !this.getAllSubscription.closed) {
      this.getAllSubscription.unsubscribe();
    }

    this.getAllSubscription = this.todoService.getAllTodos(this.filters, this.sorting)
      .subscribe((todosList: TodoListItemDto[]) => {
        this.todosListFiltered = [...todosList];
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
    this.addItemSubscription?.unsubscribe();
    this.removeItemSubscription?.unsubscribe();
    this.followTodosService.clearFollowIds();
  }
}
