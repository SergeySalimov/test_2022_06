import { TranslateConfigInterface } from '@core/interfaces';

export enum LanguageEnum {
  EN = 'en',
  RU = 'ru',
}

export const LANGUAGES: Array<LanguageEnum> = [
  LanguageEnum.EN,
  LanguageEnum.RU,
];
export const DEFAULT_LANGUAGE: LanguageEnum = LanguageEnum.EN;

export const LANGUAGES_DATA: TranslateConfigInterface = {
  languages: LANGUAGES,
  default: DEFAULT_LANGUAGE,
};
