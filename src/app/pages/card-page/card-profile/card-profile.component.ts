import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoListItem } from '../../../shared/interfaces/to-do-page.interface';
import textField from '../../../../assets/textField.json';
import { AppRoutes } from '../../../app-routing.helper';
import { InputConfigInterface, PossibleInputType } from '../../../shared/interfaces/input-config.interface';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProfileComponent {
  @Input() todoItem!: TodoListItem | null;
  @Input() inputsConfigForLeft!: Array<InputConfigInterface>;
  @Input() inputsConfigForRight!: Array<InputConfigInterface>;

  textField = textField;
  editMode = true;
  route: typeof AppRoutes = AppRoutes;

  getTodoItemValue(todo: TodoListItem, config: InputConfigInterface): PossibleInputType {
    return todo[config.keyForValue] ?? null;
  }
}
