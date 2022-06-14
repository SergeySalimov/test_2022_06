import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PollStatusListDto, TodoListItemDto } from '@common/interfaces';
import { NO_LOADER_HEADER } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItemDto>> = new BehaviorSubject<Array<TodoListItemDto>>([]);
  public todoList$: Observable<Array<TodoListItemDto>> = this._todoList$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getAllTodos(noLoader: boolean = false): Observable<TodoListItemDto[]> {
    return this.http.get<TodoListItemDto[]>(
      'api/cards',
      noLoader ? { headers: NO_LOADER_HEADER } : {},
    ).pipe(
      take(1),
      tap((data: TodoListItemDto[]) => this.updateTodosWithoutServer(data)),
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

  updateTodosWithoutServer(todos: TodoListItemDto[]): void {
    this._todoList$.next(todos);
  }
}
