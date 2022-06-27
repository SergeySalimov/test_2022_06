import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFilter, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { NO_LOADER_HEADER } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  public statusEnum$: Observable<StatusEnumDto[]> = this.getStatusEnum().pipe(
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  static readonly baseURL = 'api/cards';

  constructor(private readonly http: HttpClient) {}

  getAllTodos(filters: IFilter, noLoader = false): Observable<TodoListItemDto[]> {
    return this.http.post<TodoListItemDto[]>(
      `${ToDoService.baseURL}/get-all`,
      { filters },
      noLoader ? { headers: NO_LOADER_HEADER } : {},
      );
  }

  addTodoItem(description: string): Observable<TodoListItemDto> {
    return this.http.post<TodoListItemDto>(ToDoService.baseURL, { description });
  }

  removeTodoItem(id: string): Observable<TodoListItemDto> {
    return this.http.delete<TodoListItemDto>(`${ToDoService.baseURL}/${id}`);
  }

  getItemById(id: string): Observable<TodoListItemDto | null> {
    return this.http.get<TodoListItemDto | null>(`${ToDoService.baseURL}/${id}`);
  }

  updateTodoItem(data: TodoListItemDto): Observable<TodoListItemDto> {
    return this.http.put<TodoListItemDto>(ToDoService.baseURL, data);
  }

  checkStatus(cardIds: string[]): Observable<PollStatusListDto[]> {
    return this.http.post<PollStatusListDto[]>(
      `${ToDoService.baseURL}/poll-status`,
      { cardIds },
      { headers: NO_LOADER_HEADER },
    );
  }

  getStatusEnum(): Observable<StatusEnumDto[]> {
    return this.http.get<StatusEnumDto[]>(`${ToDoService.baseURL}/status-enum`);
  }
}
