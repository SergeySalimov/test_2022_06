import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoListItem } from '../shared/interface/to-do-page.interface';

@Injectable()
export class ToDoService {
  private _todoList$: BehaviorSubject<Array<TodoListItem>> = new BehaviorSubject<Array<TodoListItem>>([]);
  public todoList$: Observable<Array<TodoListItem>> = this._todoList$.asObservable();

  addTodoItem(description: string): void {
    if (!description || typeof description !== 'string') {
      return;
    }

    const todoList: Array<TodoListItem> = this._todoList$.getValue();
    todoList.push({description, createdAt: new Date()});

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
}
