import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ToDoPageService {
  private _followedTodos$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  followedTodos$: Observable<string[]> = this._followedTodos$.asObservable();

  removeFollowedFromList(expiredTodoId: string): void {
    const followedTodos: string[] = this._followedTodos$.getValue();
    const index: number = followedTodos.indexOf(expiredTodoId);

    if (index !== -1) {
      followedTodos.splice(index, 1);
    }

    this._followedTodos$.next(followedTodos);
  }

  changeFollowStatus(id: string): void {
    const followedTodos: string[] = this._followedTodos$.getValue();
    const index: number = followedTodos.indexOf(id);

    index === -1 ? followedTodos.push(id) : followedTodos.splice(index, 1);

    this._followedTodos$.next(followedTodos);
  }

  isFollowedExists(): boolean {
    return !!this._followedTodos$.getValue().length;
  }
}
