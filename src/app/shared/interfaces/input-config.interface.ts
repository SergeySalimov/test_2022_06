import { TodoListItem } from './to-do-page.interface';
import { Validators } from '@angular/forms';

export interface InputConfigInterface {
  name: string;
  keyForValue: keyof TodoListItem ;
  editable: boolean;
  position: 'left' | 'right';
  inputType?: 'text' | 'number' | 'textArea';
  validators?: Array<Validators>;
  pipe?: 'date'
}

export type PossibleInputType = string | number | Date | null;
