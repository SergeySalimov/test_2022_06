import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ToDoService } from '../../services/to-do.service';
import { TodoListItem } from '../../shared/interfaces/to-do-page.interface';
import { inputConfig } from './card-page.config';
import { InputPositionEnum } from '../../shared/interfaces/input-config.interface';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent {
  cardData$: Observable<TodoListItem | null> = this.todoService.todoList$.pipe(
    map((todos: Array<TodoListItem>) => todos.find(todo => todo.id === this.route.snapshot.params['cardId']) || null),
  );

  inputForLeft = inputConfig.filter(config => config.position === InputPositionEnum.LEFT);
  inputForRight = inputConfig.filter(config => config.position === InputPositionEnum.RIGHT);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoService: ToDoService,
  ) {}
}
