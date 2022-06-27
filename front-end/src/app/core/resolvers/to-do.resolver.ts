import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDoService } from '@core/services';
import { TodoListItemDto } from '@common/interfaces';
import { CLEAR_FILTER } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class ToDoResolver implements Resolve<TodoListItemDto[]> {
  constructor(private readonly todoService: ToDoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TodoListItemDto[]> {
    return this.todoService.getAllTodos(CLEAR_FILTER);
  }
}
