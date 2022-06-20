import { Injectable } from '@angular/core';
import { IFilter } from '@common/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoService } from '@app/core/services/to-do.service';

export const CLEAR_FILTER: IFilter = {
  dateFrom: null,
  dateTill: null,
  description: null,
  status: null,
};

@Injectable({
  providedIn: 'root'
})
export class FilterTodosService {
  private _filters$: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(CLEAR_FILTER);
  filters$: Observable<IFilter> = this._filters$.asObservable();
  constructor(private readonly todoService: ToDoService) {}
  changeFilters(filters: IFilter): void {
    this._filters$.next(filters);
    this.todoService.getPartialTodos(filters).subscribe();
  }
}
