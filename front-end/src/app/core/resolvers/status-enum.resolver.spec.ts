import { TestBed } from '@angular/core/testing';

import { StatusEnumResolver } from './status-enum.resolver';

describe('StatusEnumResolver', () => {
  let resolver: StatusEnumResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StatusEnumResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
