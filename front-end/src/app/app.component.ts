import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ToDoService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { translateConfigToken } from '@app/app.module';
import { TranslateConfigInterface } from '@core/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'redirect-project';
  constructor(
    private readonly todoService: ToDoService,
    private readonly translate: TranslateService,
    @Inject(translateConfigToken) private readonly translateConfig: TranslateConfigInterface,
  ) {
    translate.addLangs(translateConfig.languages);
    translate.setDefaultLang(translateConfig.default);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ru/) ? browserLang : translateConfig.default);
  }
  ngOnInit(): void {
    this.todoService.getAllTodos();
  }
}
