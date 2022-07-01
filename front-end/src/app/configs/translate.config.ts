import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from '@core/services';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export const TRANSLATE_MODULE_CONFIG = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
  missingTranslationHandler:
    { provide: MissingTranslationHandler, useClass: MissingTranslationService },
  useDefaultLang: true,
}
