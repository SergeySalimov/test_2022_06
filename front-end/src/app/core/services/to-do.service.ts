import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { TodoListItem } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItem>> = new BehaviorSubject<Array<TodoListItem>>([]);
  public todoList$: Observable<Array<TodoListItem>> = this._todoList$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getAllTodos(): void {
    this.http.get<Array<TodoListItem>>('api/cards').pipe(
      take(1),
    ).subscribe((data: TodoListItem[]) => {
      this._todoList$.next(data);
    });
  }

  addTodoItem(description: string): void {
    if (!description) {
      return;
    }

    const newTodo: TodoListItem = { description, createdAt: new Date() };
    this.http.post<Array<TodoListItem>>('api/cards', newTodo).pipe(
      take(1),
    ).subscribe((data: TodoListItem[]) => {
      this._todoList$.next(data);
    });
  }

  removeTodoItem(id: string): void {
    this.http.delete<Array<TodoListItem>>(`api/cards/${id}`).pipe(
      take(1),
    ).subscribe((data: TodoListItem[]) => {
      this._todoList$.next(data);
    });
  }

  getItemById(id: string): Observable<TodoListItem | null> {
    return this.http.get<TodoListItem|null>(`api/cards/${id}`);
  }

  updateCurrentTodos(todo: TodoListItem): void {
    const todos: TodoListItem[] = this._todoList$.getValue();
    const indexOfTodos: number = todos.findIndex(item => item.id === todo.id);

    if (indexOfTodos === -1) {
      return;
    }

    todos[indexOfTodos] = todo;

    this._todoList$.next(todos);
  }

  updateTodoItem(data: TodoListItem): Observable<TodoListItem> {
    return this.http.put<TodoListItem>(`api/cards/${data.id}`, data);
  }
}
