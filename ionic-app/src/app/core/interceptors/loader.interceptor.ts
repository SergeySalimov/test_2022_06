import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly loadingControl: LoadingController) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.loadingControl.create({ message: 'Please wait ...'})).pipe(
      tap(loading => loading.present()),
      switchMap((loading) => next.handle(request).pipe(
        delay(environment.DELAY_FOR_LOADER),
        finalize(() => loading.dismiss())
      ))
    );
  }
}
