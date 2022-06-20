import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { TranslateService } from '@ngx-translate/core';
import { mockCommonService, mockTranslateService } from '@shared/test-shared/mock.service';
import { CommonService } from '@core/services';

describe('ErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorInterceptor,
      { provide: TranslateService, useValue: mockTranslateService },
      { provide: CommonService, useValue: mockCommonService },
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
