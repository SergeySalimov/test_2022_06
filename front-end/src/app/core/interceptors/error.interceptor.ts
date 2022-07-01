import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from '@core/services';
import { IErrorInterface, MessageTypeEnum } from '@core/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly commonService: CommonService, private readonly translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse & IErrorInterface) => {
          const errorCode = `${error.error?.status ?? error.status}`;
          let text = this.translate.instant('errors.serverErrors.text');
          let message = '';

          switch (errorCode) {
            case '404':
              message += this.translate.instant('errors.serverErrors.NotFoundMessage') + ' ';
              break;
            case '400':
              message += this.translate.instant('errors.serverErrors.BadRequestMessage') + ' ';
              break;
            default:
              message += '!!! ';
          }

          message += this.translate.instant('errors.serverErrors.defaultMessage');

          this.commonService.addMessage({
            text: text.replace('$1', errorCode).replace('$2', message),
            type: MessageTypeEnum.SERVER_ERROR,
          });

          return throwError(() => error);
        })
      );
  }
}
