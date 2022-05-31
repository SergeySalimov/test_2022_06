import { TodoListItem } from './to-do-page.interface';
import { ValidatorFn } from '@angular/forms';

export enum InputPositionEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum InputTypeEnum {
  TEXT = 'text',
  TEXT_AREA = 'textArea',
  NUMBER = 'number',
  PHONE = 'phone',
  DATE = 'date',
  DATE_TIME = 'date-time',
}

export enum PipeTypeEnum {
  DATE = 'date',
  PHONE = 'phone',
}

export interface InputConfigInterface {
  name: string;
  keyForValue: keyof TodoListItem;
  editable: boolean;
  position: InputPositionEnum;
  inputType?: InputTypeEnum;
  validators?: Array<ValidatorFn> | ValidatorFn;
  pipe?: PipeTypeEnum;
}

export type PossibleInputType = string | number | Date | null;
