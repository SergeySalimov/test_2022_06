import { Observable, of } from 'rxjs';

export class ToDoServiceStub {
  todoList$: Observable<any> = of([]);
  statusEnum$: Observable<any> = of([]);
  getAllTodos() {}
  getPartialTodos() {}
  addTodoItem() {}
  removeTodoItem() {}
  getItemById() {}
  updateTodoItem() {}
  checkStatus() {}
  getStatusEnum() {}
  updateTodosWithoutServer() {}
}

export class ChangeDetectorRefStub {
  markForCheck() {}
}

export class TranslateServiceStub {
  public get(key: any): any {
    return of(key);
  }
}

export class FollowTodosServiceStub {
  followedTodos$: Observable<any> = of([]);
  startFollowAll() {}
  stopFollowAll() {}
  removeFollowedFromList() {}
  changeFollowStatus() {}
  isFollowedExists() {}
}

export class FilterTodosServiceStub {
  filters$: Observable<any> = of([]);
  changeFilters() {}
}

export class CommonServiceStub {
  showLoader$: Observable<any> = of([]);
  message$: Observable<any> = of([]);
  showLoader() {}
  hideLoader() {}
  addMessage() {}
  removeMessage() {}
}
