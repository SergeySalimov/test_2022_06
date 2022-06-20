import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-to-do-table-header',
  templateUrl: './to-do-table-header.component.html',
  styleUrls: ['./to-do-table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoTableHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
