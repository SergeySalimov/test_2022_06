import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FollowType } from '@app/pages/to-do-page/to-do-page.interface';

@Component({
  selector: 'app-to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoTableComponent {
  @Input() filters!: IFilter;
  @Input() todosFiltered!: TodoListItemDto[];
  @Input() statusEnum!: StatusEnumDto[];
  @Input() expiredStatusValue!: number;
  @Input() followedTodos!: string[];
  @Output() onChangeFallowAll: EventEmitter<FollowType> = new EventEmitter<FollowType>();
  @Output() onChangeFilters: EventEmitter<IFilter> = new EventEmitter<IFilter>();
  @Output() onFollowItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteItem: EventEmitter<string> = new EventEmitter<string>();

  //Follow Block
  changeFollowAll(type: FollowType): void {
    this.onChangeFallowAll.emit(type);
  }
  followItem(id: string): void {
    this.onFollowItem.emit(id);
  }

  //Filtering block
  changeFilters(filters: IFilter): void {
    this.onChangeFilters.emit(filters);
  }

  //other
  deleteItem(id: string): void {
    this.onDeleteItem.emit(id);
  }
}
