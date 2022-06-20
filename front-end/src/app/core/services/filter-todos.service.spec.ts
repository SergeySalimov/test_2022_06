import { TestBed } from '@angular/core/testing';

import { FilterTodosService } from './filter-todos.service';
import { ToDoService } from '@app/core/services/to-do.service';
import { mockTodoService } from '@shared/test-shared/mock.service';

describe('FilterTodosService', () => {
  let service: FilterTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterTodosService,
        { provide: ToDoService, useValue: mockTodoService }
      ],
    });
    service = TestBed.inject(FilterTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
