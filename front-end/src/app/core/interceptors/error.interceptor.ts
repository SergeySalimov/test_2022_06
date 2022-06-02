import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from '../services/common.service';
import { MessageTypeEnum } from '../interfaces/message.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let text = `Error Code: ${error.status}, message: ${error.error ?? error.message}`;
          this.commonService.addMessage({ text, type: MessageTypeEnum.SERVER_ERROR });
          return throwError(() => error);
        })
      );
  }
}
