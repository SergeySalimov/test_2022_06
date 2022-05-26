import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ToDoService } from '../../services/to-do.service';
import { TodoListItem } from '../../shared/interfaces/to-do-page.interface';
import { inputConfig } from './card-page-input.config';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent {
  cardData$: Observable<TodoListItem | null> = this.route.params.pipe(
    map(({ cardId }) => cardId ? this.todoService.getItemById(cardId) : null),
  );

  inputForLeft = inputConfig.filter(config => config.position === 'left');
  inputForRight = inputConfig.filter(config => config.position === 'right');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoService: ToDoService,
  ) {
  }
}
