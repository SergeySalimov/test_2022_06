import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CLEAR_FILTER, FilterTodosService, FollowTodosService, ToDoService } from '@core/services';
import { combineLatest, map, Observable } from 'rxjs';
import { IFilter, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { ToDoTableBodyComponent } from '@app/pages/to-do-page/to-do-table/to-do-table-body/to-do-table-body.component';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  @ViewChild('tableBody') tableBody!: ToDoTableBodyComponent;

  showTodos$: Observable<boolean> = combineLatest([
    this.todoService.todoList$,
    this.filtersService.filters$,
  ]).pipe(
    map(([todos, filters]: [TodoListItemDto[], IFilter]) =>
      Object.values(filters).some(filterValues => filterValues !== null) || todos.length > 0),
  );

  todos$: Observable<TodoListItemDto[]> = this.todoService.todoList$;
  statusEnum$: Observable<StatusEnumDto[]> = this.todoService.statusEnum$;
  filters$: Observable<IFilter> = this.filtersService.filters$;

  clearFilter: IFilter = CLEAR_FILTER;

  get lastStatusEnumValue(): number {
    return this.todoService.statusEnum$.getValue().slice(-1)[0].value;
  }

  constructor(
    private readonly todoService: ToDoService,
    private readonly followTodosService: FollowTodosService,
    private readonly filtersService: FilterTodosService
  ) {}

  onStartFollowAll(todos: TodoListItemDto[]): void {
    const ids: string[] = todos
      .filter(todo => todo.pollStatus !== this.lastStatusEnumValue)
      .map(todo => todo.id);

    this.followTodosService.startFollowAll(ids);
    this.tableBody.startFollowItems();
  }

  onStopFollowAll(): void {
    this.followTodosService.stopFollowAll();
  }

  onChangeFilters(filters: IFilter): void {
    this.filtersService.changeFilters(filters)
  }
}
