import { LanguageEnum } from '@core/constants';

export interface TranslateConfigInterface {
  languages: Array<LanguageEnum>,
  default: LanguageEnum,
}
