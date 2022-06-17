import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TrackByFunction
} from '@angular/core';
import { combineLatest, interval, map, Observable, Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppRoutes, FilterTodosService, ToDoService } from '@core/services';
import { PING_POLL_STATUS_INTERVAL } from '@core/constants';
import { trackById } from '@shared/utils';
import { dateTimeFormatToken } from '@shared/shared.module';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FollowTodosService } from '@app/core/services/follow-todos.service';

@Component({
  selector: 'app-to-do-table-body',
  templateUrl: './to-do-table-body.component.html',
  styleUrls: ['./to-do-table-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableBodyComponent implements OnInit, OnDestroy {
  todoList$: Observable<TodoListItemDto[]> = combineLatest([
    this.todoService.todoList$,
    this.filterTodosService.filters$,
  ]).pipe(
    map(([todos, filters]: [TodoListItemDto[], IFilter]) => todos.filter(todo =>
      filters.status === 'null' || filters.status === null ? true : todo.pollStatus === +filters.status),
      ),
  );

  followedTodos: string[] = [];
  trackByFunction: TrackByFunction<any> = trackById;
  statusEnum!: StatusEnumDto[];
  private intervalSubscription!: Subscription;
  private followedSubscription!: Subscription;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService,
    private readonly followTodosService: FollowTodosService,
    private readonly filterTodosService: FilterTodosService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  get lastStatusEnumValue(): number {
    return this.todoService.statusEnum$.getValue().slice(-1)[0]?.value;
  }

  ngOnInit(): void {
    this.followedSubscription = this.followTodosService.followedTodos$.subscribe((data: string[]) => {
      this.followedTodos = [...data];
      this.cdr.markForCheck();

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
    return todo.pollStatus === this.lastStatusEnumValue;
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
      if (todo.pollStatus === this.lastStatusEnumValue) {
        this.followTodosService.removeFollowedFromList(todo.id);
      }
    }

    if (changed) {
      this.todoService.updateTodosWithoutServer(todos);
    }
  }

  onDeleteItem(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.todoService.removeTodoItem(id).pipe(
      tap(() => this.followTodosService.removeFollowedFromList(id)),
    ).subscribe();
  }

  startFollowItems(): void {
    this.intervalSubscription = interval(PING_POLL_STATUS_INTERVAL).pipe(
      switchMap(() => this.todoService.checkStatus(this.followedTodos)),
      withLatestFrom(this.todoList$),
    ).subscribe(([data, todos]: [PollStatusListDto[], TodoListItemDto[]]) => {
      this.refreshPollStatus(data, todos);
    });
  }

  onFollowItem(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.followTodosService.changeFollowStatus(id);

    if (!this.followTodosService.isFollowedExists() || (this.intervalSubscription && !this.intervalSubscription.closed)) {
      return;
    }

    this.startFollowItems();
  }

  ngOnDestroy(): void {
    this.stopPingServer();
    this.followedSubscription?.unsubscribe();
  }
}
