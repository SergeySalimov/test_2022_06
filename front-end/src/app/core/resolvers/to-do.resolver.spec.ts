import { TestBed } from '@angular/core/testing';

import { ToDoResolver } from './to-do.resolver';
import { ToDoService } from '@core/services';
import { ToDoServiceStub } from '@shared/test-shared/mock.service';

describe('ToDoResolver', () => {
  let resolver: ToDoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
      ],
    });
    resolver = TestBed.inject(ToDoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
