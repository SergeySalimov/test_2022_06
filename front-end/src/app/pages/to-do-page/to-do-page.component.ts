import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import textField from '../../../assets/textField.json';
import { TextFieldInterface } from '../../core/interfaces/text-field.interface';
import { ToDoService } from '../../core/services/to-do.service';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoPageComponent implements OnInit {
  textField: TextFieldInterface = textField;
  constructor(private readonly todoService: ToDoService) {
  }

  ngOnInit(): void {
    this.todoService.getAllTodos();
  }
}
