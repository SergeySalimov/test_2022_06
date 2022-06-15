import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-to-do-table-filter',
  templateUrl: './to-do-table-filter.component.html',
  styleUrls: ['./to-do-table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
