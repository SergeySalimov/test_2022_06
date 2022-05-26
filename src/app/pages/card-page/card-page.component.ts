import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ToDoService } from '../../services/to-do.service';
import { TodoListItem } from '../../shared/interface/to-do-page.interface';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent {
  cardData$: Observable<TodoListItem | null> = this.route.params.pipe(
    map(({ cardId }) => cardId ? this.todoService.getItemById(cardId) : null),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoService: ToDoService,
  ) {
  }
}
