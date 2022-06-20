import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { CommonServiceStub } from '@shared/test-shared/mock.service';
import { CommonService } from '@core/services';

describe('ErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [
      ErrorInterceptor,
      { provide: CommonService, useClass: CommonServiceStub },
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
