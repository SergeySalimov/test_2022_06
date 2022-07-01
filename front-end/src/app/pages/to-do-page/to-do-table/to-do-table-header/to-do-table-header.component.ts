import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, skip, startWith, Subject, Subscription } from 'rxjs';
import { ISort, SortFieldType } from '@common/interfaces';
import { DEBOUNCE_BEFORE_REQUEST } from '@core/constants';

@Component({
  selector: 'app-to-do-table-header',
  templateUrl: './to-do-table-header.component.html',
  styleUrls: ['./to-do-table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableHeaderComponent implements OnInit, OnDestroy {
  @Input() sorting!: ISort;
  @Output() onSortChange: EventEmitter<ISort> = new EventEmitter<ISort>();

  private sortingSubject: Subject<ISort> = new Subject<ISort>();
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.sortingSubject.pipe(
        startWith({ ...this.sorting }),
        debounceTime(DEBOUNCE_BEFORE_REQUEST),
        distinctUntilChanged((a, b) => a?.date === b?.date && a?.description === b?.description),
        skip(1)
      )
        .subscribe((sorting: ISort) => this.onSortChange.emit({ ...sorting })),
    );
  }

  sortChange(type: SortFieldType): void {
    type === 'date' ? this.sorting['description'] = null : this.sorting['date'] = null;
    this.sorting[type] = this.sorting[type] === 'desc' ? 'asc' : 'desc';
    this.sortingSubject.next(this.sorting);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
