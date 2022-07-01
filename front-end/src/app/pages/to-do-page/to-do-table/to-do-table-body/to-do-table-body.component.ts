import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TrackByFunction
} from '@angular/core';
import { AppRoutes } from '@core/services';
import { trackById } from '@shared/utils';
import { dateTimeFormatToken } from '@shared/shared.module';
import { TodoListItemDto } from '@common/interfaces';

@Component({
  selector: 'app-to-do-table-body',
  templateUrl: './to-do-table-body.component.html',
  styleUrls: ['./to-do-table-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableBodyComponent {
  @Input() todosFiltered!: TodoListItemDto[];
  @Input() followedTodos!: string[];
  @Input() expiredStatusValue!: number;
  @Output() onFollowItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteItem: EventEmitter<string> = new EventEmitter<string>();
  trackByFunction: TrackByFunction<any> = trackById;

  constructor(@Inject(dateTimeFormatToken) public dateTimeFormat: string) {}

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  isTodoFollowed(id: string): boolean {
    return this.followedTodos.includes(id);
  }

  isTodoExpired(todo: TodoListItemDto): boolean {
    return todo.pollStatus === this.expiredStatusValue;
  }

  deleteItem(id: string): void {
    this.onDeleteItem.emit(id);
  }

  followItem(id: string): void {
    this.onFollowItem.emit(id);
  }
}
