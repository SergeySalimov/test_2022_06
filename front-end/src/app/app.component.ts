import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@core/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'redirect-project';
  constructor(private readonly translate: TranslateService) {
    translate.addLangs(LANGUAGES);
    translate.setDefaultLang(DEFAULT_LANGUAGE);
  }
}
