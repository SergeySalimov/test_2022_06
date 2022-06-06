import { Pipe, PipeTransform } from '@angular/core';
import EN from '@locale/en.json';
import RU from '@locale/ru.json';
import { TranslateService } from '@core/services';
import { LanguageEnum } from '@core/constants';

const LOCALIZATION_ERROR = 'Bad localization';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(value: string): string {
    const currentLanguage: LanguageEnum = this.translateService.getCurrentLanguage();
    const keys: string[] = value.split('.');
    let source: Record<string, any> = currentLanguage === LanguageEnum.EN ? { ...EN } : { ...RU };
    let target!: Record<string, any> | string;

    for (let key of keys) {
      if (key in source) {
        target = { ...source }[key];
      } else {
        target = LOCALIZATION_ERROR;
        break;
      }
      source = { ...target as Record<string, any> };
    }

    return (typeof target) === 'string' ? <string>target : LOCALIZATION_ERROR;
  }
}
