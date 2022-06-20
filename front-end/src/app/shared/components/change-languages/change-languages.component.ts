import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LanguageEnum } from '@core/constants';
import { translateConfigToken } from '@app/app.module';
import { TranslateConfigInterface } from '@core/interfaces';
import { TranslateService } from '@ngx-translate/core';

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
    public readonly translate: TranslateService,
    ) {}
}
