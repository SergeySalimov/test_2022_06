import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { CommonService } from '@core/services';
import { NO_LOADER } from '@core/constants';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.get(NO_LOADER)) {
      this.commonService.showLoader();
    }

    return next.handle(request).pipe(finalize(() => this.commonService.hideLoader()));
  }
}
