import { ChangeDetectionStrategy, Component } from '@angular/core';
import textField from '../../../assets/textField.json';
import { TextFieldInterface } from '../../shared/interfaces/text-field.interface';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoPageComponent {
  textField: TextFieldInterface = textField;
}
