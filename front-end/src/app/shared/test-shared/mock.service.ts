import { Observable, of } from 'rxjs';

export class ToDoServiceStub {
  statusEnum$: Observable<any> = of([]);
  getAllTodos() {}
  addTodoItem() {}
  removeTodoItem() {}
  getItemById() {}
  updateTodoItem() {}
  checkStatus() {}
  getStatusEnum() {}
}

export class ChangeDetectorRefStub {
  markForCheck() {}
}

export class FollowTodosServiceStub {
  followedTodos$: Observable<any> = of([]);
  addIdsToFollow() {}
  clearFollowIds() {}
  removeFollowedFromList() {}
  changeFollowStatus() {}
  isFollowedExists() {}
}

export class CommonServiceStub {
  showLoader$: Observable<any> = of([]);
  message$: Observable<any> = of([]);
  showLoader() {}
  hideLoader() {}
  addMessage() {}
  removeMessage() {}
}

export class ActivatedRouteStub {
  data: Observable<any> = of({
    statusEnum: [],
    todos: [],
  });
}
