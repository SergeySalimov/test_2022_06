import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToDoService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@core/constants';

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
  ) {
    translate.addLangs(LANGUAGES);
    translate.setDefaultLang(DEFAULT_LANGUAGE);
  }
  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe();
    this.todoService.getStatusEnum().subscribe();
  }
}
