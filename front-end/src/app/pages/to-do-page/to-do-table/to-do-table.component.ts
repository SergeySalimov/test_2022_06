import { ChangeDetectionStrategy, Component, Inject, TrackByFunction } from '@angular/core';
import { ToDoService } from '../../../core/services/to-do.service';
import { Observable } from 'rxjs';
import textField from '../../../../assets/textField.json';
import { TodoListItem } from '../../../core/interfaces/to-do-page.interface';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import { trackById } from '../../../shared/utils/track-by-id';
import { AppRoutes } from '../../../app-routing.helper';
import { TextFieldInterface } from '../../../core/interfaces/text-field.interface';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  textField: TextFieldInterface = textField;
  trackByFunction: TrackByFunction<any> = trackById;

  todoList$: Observable<Array<TodoListItem>> = this.todoService.todoList$;
  tableHeader: string[] = [
    this.textField.todo.tableDate,
    this.textField.todo.tableDescription,
    this.textField.todo.tableAction,
  ];

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly todoService: ToDoService
  ) {
  }

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  onDeleteItem(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.todoService.removeTodoItem(id);
  }
}
