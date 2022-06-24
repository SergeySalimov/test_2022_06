import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share, Subscription, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { NO_LOADER_HEADER } from '@core/constants';

export const CLEAR_FILTER: IFilter = {
  dateFrom: null,
  dateTill: null,
  description: null,
  status: null,
};

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItemDto>> = new BehaviorSubject<Array<TodoListItemDto>>([]);
  public todoList$: Observable<Array<TodoListItemDto>> = this._todoList$.asObservable();
  public statusEnum$: BehaviorSubject<StatusEnumDto[]> = new BehaviorSubject<StatusEnumDto[]>([]);
  private _filters$: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(CLEAR_FILTER);
  filters$: Observable<IFilter> = this._filters$.asObservable();

  getAllSubscription!: Subscription;

  constructor(private readonly http: HttpClient) {}

  getAllTodos(filters: IFilter): Observable<TodoListItemDto[]> {
    return this.http.post<TodoListItemDto[]>(
      'api/cards/get-all',
      { filters },
    ).pipe(
      take(1),
      tap((data: TodoListItemDto[]) => this.updateTodosWithoutServer(data)),
      share(),
    );
  }

  addTodoItem(description: string): Observable<TodoListItemDto> {
    return this.http.post<TodoListItemDto>('api/cards', { description }).pipe(
      take(1),
      tap((data: TodoListItemDto) => {
        const todos: TodoListItemDto[] = this._todoList$.getValue();
        todos.push(data);
        this.updateTodosWithoutServer(todos);
      }),
    );
  }

  removeTodoItem(id: string): Observable<TodoListItemDto> {
    return this.http.delete<TodoListItemDto>(`api/cards/${id}`).pipe(
      take(1),
      tap(() => {
        const todos: TodoListItemDto[] = this._todoList$.getValue();
        const indexOfDeletedItem: number = todos.findIndex(item => item.id === id);

        if (indexOfDeletedItem !== -1) {
          todos.splice(indexOfDeletedItem, 1);
        }

        this.updateTodosWithoutServer(todos);
      })
    );
  }

  getItemById(id: string): Observable<TodoListItemDto|null> {
    return this.http.get<TodoListItemDto | null>(`api/cards/${id}`);
  }

  updateTodoItem(data: TodoListItemDto): Observable<TodoListItemDto> {
    return this.http.put<TodoListItemDto>(`api/cards`, data);
  }

  checkStatus(cardIds: string[]): Observable<PollStatusListDto[]> {
    return this.http.post<PollStatusListDto[]>(
      'api/cards/poll-status',
      { cardIds },
      { headers: NO_LOADER_HEADER },
    );
  }

  getStatusEnum(): Observable<StatusEnumDto[]> {
    return this.http.get<StatusEnumDto[]>('api/cards/status-enum').pipe(
      take(1),
      tap(statusEnum => this.statusEnum$.next(statusEnum)),
    );
  }

  getExpiredStatusValue(): number|null {
    const statusEnums: StatusEnumDto[] = this.statusEnum$.getValue();
    const expiredEnum: StatusEnumDto|undefined = statusEnums.find(item => /EXPIRED/i.test(item.key));

    return expiredEnum ? expiredEnum.value : null;
  }

  updateTodosWithoutServer(todos: TodoListItemDto[]): void {
    this._todoList$.next(todos);
  }

  changeFilters(filters: IFilter): void {
    this._filters$.next(filters);
    if (this.getAllSubscription && !this.getAllSubscription.closed) {
      this.getAllSubscription.unsubscribe();
    }
    this.getAllSubscription = this.getAllTodos(filters).subscribe();
  }
}
