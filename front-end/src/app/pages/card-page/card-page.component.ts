import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDoService } from '@core/services';
import { InputPositionEnum, TodoListItem } from '@core/interfaces';
import { inputConfig } from './card-page.config';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent {
  cardData$: Observable<TodoListItem | null> = this.todoService.getItemById(this.route.snapshot.params['cardId']);

  inputForLeft = inputConfig.filter(config => config.position === InputPositionEnum.LEFT);
  inputForRight = inputConfig.filter(config => config.position === InputPositionEnum.RIGHT);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoService: ToDoService,
  ) {}
}
