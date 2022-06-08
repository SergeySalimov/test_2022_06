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
    this.http.get<Array<TodoListItemDto>>('cards').pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  addTodoItem(description: string): void {
    if (!description) {
      return;
    }

    const newTodo: TodoListItemDto = { description, createdAt: new Date() };
    this.http.post<Array<TodoListItemDto>>('/api/cards', newTodo).pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  removeTodoItem(id: string): void {
    this.http.delete<Array<TodoListItemDto>>(`/api/cards/${id}`).pipe(
      take(1),
    ).subscribe((data: TodoListItemDto[]) => {
      this._todoList$.next(data);
    });
  }

  getItemById(id: string): Observable<TodoListItemDto | null> {
    return this.http.get<TodoListItemDto|null>(`/api/cards/${id}`);
  }

  updateCurrentTodos(todo: TodoListItemDto): void {
    const todos: TodoListItemDto[] = this._todoList$.getValue();
    const indexOfTodos: number = todos.findIndex(item => item.id === todo.id);

    if (indexOfTodos === -1) {
      return;
    }

    todos[indexOfTodos] = todo;

    this._todoList$.next(todos);
  }

  updateTodoItem(data: TodoListItemDto): Observable<TodoListItemDto> {
    return this.http.put<TodoListItemDto>(`/api/cards/${data.id}`, data);
  }
}
