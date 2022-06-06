import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TranslateService } from '@core/services';
import { LanguageEnum } from '@core/constants';
import { translateConfigToken } from '../../../app.module';
import { TranslateConfigInterface } from '@core/interfaces';

@Component({
  selector: 'app-change-languages',
  templateUrl: './change-languages.component.html',
  styleUrls: ['./change-languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeLanguagesComponent {
  selected: LanguageEnum = this.translateConfig.default;
  constructor(
    @Inject(translateConfigToken) public readonly translateConfig: TranslateConfigInterface,
    public readonly translateService: TranslateService,
    ) {}
}
