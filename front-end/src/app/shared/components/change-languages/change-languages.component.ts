import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_LANGUAGE, LanguageEnum } from '@core/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-languages',
  templateUrl: './change-languages.component.html',
  styleUrls: ['./change-languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeLanguagesComponent {
  selected: LanguageEnum = DEFAULT_LANGUAGE;
  constructor(public readonly translate: TranslateService) {}
}
