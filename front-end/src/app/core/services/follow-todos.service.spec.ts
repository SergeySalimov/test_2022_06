import { TestBed } from '@angular/core/testing';

import { FollowTodosService } from './follow-todos.service';

describe('FollowTodosService', () => {
  let service: FollowTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
