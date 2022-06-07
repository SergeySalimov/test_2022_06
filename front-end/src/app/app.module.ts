import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { ErrorInterceptor, LoaderInterceptor } from '@core/interceptors';
import { TranslateConfigInterface } from '@core/interfaces';
import { LANGUAGES_DATA } from '@core/constants';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from '@app/core/services/missing-translation.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

//Todo delete
export const translateConfigToken: InjectionToken<TranslateConfigInterface> = new InjectionToken('translate-config');

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler:
        {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationService,
        },
      useDefaultLang: false,
    }),
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
