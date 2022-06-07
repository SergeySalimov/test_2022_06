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
    private readonly translateService: TranslateService,
    @Inject(translateConfigToken) private readonly translateConfig: TranslateConfigInterface,
    ) {}
  ngOnInit(): void {
    this.todoService.getAllTodos();
    this.translateService.use(this.translateConfig.default);
  }
}
