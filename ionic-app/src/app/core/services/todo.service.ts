import { Injectable } from '@angular/core';
import { IFilter, ISort, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public statusEnum$: Observable<StatusEnumDto[]> = this.getStatusEnum().pipe(
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  static readonly baseURL = 'api/cards';

  constructor(private readonly http: HttpClient) {}

  getAllTodos(filters: IFilter, sorting: ISort): Observable<TodoListItemDto[]> {
    return this.http.post<TodoListItemDto[]>(
      `${TodoService.baseURL}/get-all`,
      { filters, sorting },
    );
  }

  addTodoItem(description: string): Observable<TodoListItemDto> {
    return this.http.post<TodoListItemDto>(TodoService.baseURL, { description });
  }

  removeTodoItem(id: string): Observable<TodoListItemDto> {
    return this.http.delete<TodoListItemDto>(`${TodoService.baseURL}/${id}`);
  }

  getItemById(id: string): Observable<TodoListItemDto | null> {
    return this.http.get<TodoListItemDto | null>(`${TodoService.baseURL}/${id}`);
  }

  updateTodoItem(data: TodoListItemDto): Observable<TodoListItemDto> {
    return this.http.put<TodoListItemDto>(TodoService.baseURL, data);
  }

  checkStatus(cardIds: string[]): Observable<PollStatusListDto[]> {
    return this.http.post<PollStatusListDto[]>(
      `${TodoService.baseURL}/poll-status`,
      { cardIds },
    );
  }

  getStatusEnum(): Observable<StatusEnumDto[]> {
    return this.http.get<StatusEnumDto[]>(`${TodoService.baseURL}/status-enum`);
  }
}
