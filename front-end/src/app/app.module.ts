import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { ErrorInterceptor, LoaderInterceptor } from '@core/interceptors';
import { TranslateConfigInterface } from '@core/interfaces';
import { LANGUAGES_DATA } from '@core/constants';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const translateConfigToken: InjectionToken<TranslateConfigInterface> = new InjectionToken('translate-config');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedModule,
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    { provide: translateConfigToken, useValue: LANGUAGES_DATA },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
