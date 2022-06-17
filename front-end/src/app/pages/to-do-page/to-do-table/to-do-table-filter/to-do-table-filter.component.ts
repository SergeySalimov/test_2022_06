import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CLEAR_FILTER } from '@core/services';
import { debounceTime, distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { IFilter, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do-table-filter',
  templateUrl: './to-do-table-filter.component.html',
  styleUrls: ['./to-do-table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableFilterComponent implements OnInit, OnDestroy {
  @Input() statusEnum!: StatusEnumDto[];
  @Input() filters!: IFilter;
  @Input() todos!: TodoListItemDto[];
  @Output() startFollowAllEmit: EventEmitter<TodoListItemDto[]> = new EventEmitter<TodoListItemDto[]>();
  @Output() stopFollowAllEmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeFiltersEmit: EventEmitter<IFilter> = new EventEmitter<IFilter>();

  filterForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(),
    dateTill: new FormControl(),
    description: new FormControl(),
    status: new FormControl(),
  });

  formSubscription!: Subscription;

  get dateFromControl(): FormControl {
    return this.filterForm.get('dateFrom') as FormControl;
  }

  get dateTillControl(): FormControl {
    return this.filterForm.get('dateTill') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.filterForm.get('description') as FormControl;
  }

  get statusControl(): FormControl {
    return this.filterForm.get('status') as FormControl;
  }

  get lastStatusEnumValue(): number {
    return this.statusEnum.slice(-1)[0].value;
  }

  ngOnInit(): void {
    this.filterForm.patchValue(this.filters);

    this.formSubscription = this.filterForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(formData => ({
        ...formData,
        dateFrom: formData.dateFrom ? new Date(formData.dateFrom) : null,
        dateTill: formData.dateTill ? new Date(formData.dateTill) : null,
        status: formData.status === 'null' || formData.status === null ? null : formData.status,
      })),
      tap(filters => this.onChangeFilters(filters)),
    ).subscribe();
  }

  onChangeFilters(filters: IFilter): void {
    this.changeFiltersEmit.emit(filters);
  }

  onFollowAll(e: MouseEvent, todos: TodoListItemDto[]): void {
    e.stopPropagation();
    this.startFollowAllEmit.emit(todos);
  }

  onStopFollowAll(e: MouseEvent): void {
    e.stopPropagation();
    this.stopFollowAllEmit.emit();
  }

  onClearFilter(e: MouseEvent): void {
    e.stopPropagation();
    this.filterForm.patchValue(CLEAR_FILTER);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
