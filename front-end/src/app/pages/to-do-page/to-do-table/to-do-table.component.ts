import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter, ISort, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
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
  @Input() noItemToFollow!: boolean;
  @Input() sorting!: ISort;
  @Output() onChangeFallowAll: EventEmitter<FollowType> = new EventEmitter<FollowType>();
  @Output() onChangeFilters: EventEmitter<IFilter> = new EventEmitter<IFilter>();
  @Output() onFollowItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeleteItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSortChange: EventEmitter<ISort> = new EventEmitter<ISort>();

  changeFollowAll(type: FollowType): void {
    this.onChangeFallowAll.emit(type);
  }

  followItem(id: string): void {
    this.onFollowItem.emit(id);
  }

  changeFilters(filters: IFilter): void {
    this.onChangeFilters.emit(filters);
  }

  sortChange(sort: ISort): void {
    this.onSortChange.emit(sort);
  }

  deleteItem(id: string): void {
    this.onDeleteItem.emit(id);
  }
}
