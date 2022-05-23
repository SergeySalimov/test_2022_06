import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './to-do-input.component.html',
  styleUrls: ['./to-do-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
