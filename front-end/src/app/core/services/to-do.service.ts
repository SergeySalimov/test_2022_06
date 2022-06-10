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

  getAllTodos(noLoader: boolean = false): void {
    this.http.get<Array<TodoListItemDto>>(
      'api/cards',
      { ...(noLoader && { headers: NO_LOADER_HEADER }) },
    ).pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  addTodoItem(description: string): void {
    this.http.post<Array<TodoListItemDto>>('api/cards', { description }).pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  removeTodoItem(id: string): Observable<Array<TodoListItemDto>> {
    return this.http.delete<Array<TodoListItemDto>>(`api/cards/${id}`).pipe(
      take(1),
      tap((data: TodoListItemDto[]) => this._todoList$.next(data))
    );
  }

  getItemById(id: string): Observable<TodoListItemDto | null> {
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
