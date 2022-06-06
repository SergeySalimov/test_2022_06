import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToDoService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'redirect-project';
  constructor(private readonly todoService: ToDoService) {}
  ngOnInit(): void {
    this.todoService.getAllTodos();
  }
}
