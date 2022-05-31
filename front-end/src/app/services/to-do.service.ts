import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoListItem } from '../shared/interfaces/to-do-page.interface';
import { SharedHelper } from '../shared/utils/shared.helper';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItem>> = new BehaviorSubject<Array<TodoListItem>>([]);
  public todoList$: Observable<Array<TodoListItem>> = this._todoList$.asObservable();

  addTodoItem(description: string): void {
    if (!description) {
      return;
    }

    const todoList: Array<TodoListItem> = this._todoList$.getValue();
    todoList.push({ description, id: SharedHelper.makeId(), createdAt: new Date() });

    this._todoList$.next(todoList);
  }

  removeTodoItem(index: number): void {
    const todoList: Array<TodoListItem> = this._todoList$.getValue();

    if (index >= todoList.length) {
      return;
    }

    todoList.splice(index, 1);
    this._todoList$.next(todoList);
  }

  getItemById(id: string): TodoListItem | null {
    const todoList: Array<TodoListItem> = this._todoList$.getValue();

    return todoList.find((todo) => todo.id === id) ?? null;
  }

  updateTodoItem(data: TodoListItem): void {
    const todoList: Array<TodoListItem> = this._todoList$.getValue();
    const updateTodoIndex = todoList.findIndex((item: TodoListItem) => item.id === data.id);

    if (updateTodoIndex < 0) {
      return;
    }

    todoList[updateTodoIndex] = {
      ...todoList[updateTodoIndex],
      ...data,
    };

    this._todoList$.next(todoList);
  }
}
