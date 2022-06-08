import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from '@core/services';
import { IErrorInterface, MessageTypeEnum } from '@core/interfaces';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse & IErrorInterface) => {
          let text = `Error Code: ${error.error?.status ?? error.status}, message: ${error.error?.message ?? error.message}`;
          this.commonService.addMessage({ text, type: MessageTypeEnum.SERVER_ERROR });
          return throwError(() => error);
        })
      );
  }
}
