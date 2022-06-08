import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodoListItemDto } from '@common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItemDto>> = new BehaviorSubject<Array<TodoListItemDto>>([]);
  public todoList$: Observable<Array<TodoListItemDto>> = this._todoList$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getAllTodos(): void {
    this.http.get<Array<TodoListItemDto>>('api/cards').pipe(
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

  removeTodoItem(id: string): void {
    this.http.delete<Array<TodoListItemDto>>(`api/cards/${id}`).pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  getItemById(id: string): Observable<TodoListItemDto | null> {
    return this.http.get<TodoListItemDto|null>(`api/cards/${id}`);
  }

  updateTodoItem(data: TodoListItemDto): Observable<TodoListItemDto> {
    return this.http.put<TodoListItemDto>(`api/cards`, data);
  }
}
