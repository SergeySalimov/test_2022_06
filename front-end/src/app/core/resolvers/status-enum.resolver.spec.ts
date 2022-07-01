import { TestBed } from '@angular/core/testing';

import { StatusEnumResolver } from './status-enum.resolver';
import { ToDoService } from '@core/services';
import { ToDoServiceStub } from '@shared/test-shared/mock.service';

describe('StatusEnumResolver', () => {
  let resolver: StatusEnumResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ToDoService, useClass: ToDoServiceStub },
      ],
    });
    resolver = TestBed.inject(StatusEnumResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
