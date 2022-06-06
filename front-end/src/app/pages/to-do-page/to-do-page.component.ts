import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToDoService } from '@core/services';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoPageComponent implements OnInit {
  constructor(private readonly todoService: ToDoService) {}
  ngOnInit(): void {
    this.todoService.getAllTodos();
  }
}
