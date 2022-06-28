import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, map, skip, startWith, Subscription } from 'rxjs';
import { IFilter, StatusEnumDto } from '@common/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { FollowType } from '@app/pages/to-do-page/to-do-page.interface';
import { CLEAR_FILTER } from '@core/constants';

@Component({
  selector: 'app-to-do-table-filter',
  templateUrl: './to-do-table-filter.component.html',
  styleUrls: ['./to-do-table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableFilterComponent implements OnInit, OnDestroy {
  @Input() statusEnum!: StatusEnumDto[];
  @Input() filters!: IFilter;
  @Input() noItemToFollow!: boolean;
  @Output() onChangeFollowAll: EventEmitter<FollowType> = new EventEmitter<FollowType>();
  @Output() onChangeFilters: EventEmitter<IFilter> = new EventEmitter<IFilter>();

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

  ngOnInit(): void {
    this.filterForm.patchValue(this.filters);

    this.formSubscription = combineLatest([
      this.descriptionControl.valueChanges.pipe(
        startWith(this.filters.description),
        debounceTime(400),
        distinctUntilChanged(),
      ),
      this.dateFromControl.valueChanges.pipe(
        startWith(this.filters.dateFrom),
        distinctUntilChanged(),
        ),
      this.dateTillControl.valueChanges.pipe(
        startWith(this.filters.dateTill),
        distinctUntilChanged(),
      ),
      this.statusControl.valueChanges.pipe(
        startWith(this.filters.status),
        distinctUntilChanged(),
        ),
    ]).pipe(
      skip(1),
      map(([description, dateFrom, dateTill, status]) => ({
        description,
        dateFrom: dateFrom ? dateFrom.toString() : null,
        dateTill: dateTill ? dateTill.toString() : null,
        status: status === 'null' ? null : status,
      })),
    ).subscribe((filters: IFilter) => {
      this.onChangeFilters.emit(filters);
    });
  };

  changeFollow(type: FollowType): void {
    this.onChangeFollowAll.emit(type);
  }

  onClearFilter(): void {
    if (Object.values(this.filterForm.getRawValue()).every(filter => filter === null)) {
      return;
    }

    this.filterForm.patchValue(CLEAR_FILTER);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
