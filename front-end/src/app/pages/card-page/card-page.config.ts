import {
  InputConfigInterface,
  InputPositionEnum,
  InputTypeEnum,
  PipeTypeEnum
} from '../../shared/interfaces/input-config.interface';
import textField from '../../../assets/textField.json';
import { Validators } from '@angular/forms';

export const inputConfig: Array<InputConfigInterface> = [
  {
    name: textField.card.createdAt,
    keyForValue: 'createdAt',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.DATE_TIME,
    pipe: PipeTypeEnum.DATE,
    // validators: Validators.required,
  },
  {
    name: textField.card.name,
    keyForValue: 'name',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
    validators: Validators.required,
  },
  {
    name: textField.card.surname,
    keyForValue: 'surname',
    editable: false,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
  },
  {
    name: textField.card.patronymic,
    keyForValue: 'patronymic',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
  },
  {
    name: textField.card.email,
    keyForValue: 'email',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
    validators: [Validators.required, Validators.email],
  },
  {
    name: textField.card.phone,
    keyForValue: 'phone',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.PHONE,
    pipe: PipeTypeEnum.PHONE,
  },
  {
    name: textField.card.zipCode,
    keyForValue: 'zipCode',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.NUMBER,
  },
  {
    name: textField.card.city,
    keyForValue: 'city',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT,
  },
  {
    name: textField.card.address,
    keyForValue: 'address',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT_AREA,
  },
  {
    name: textField.card.notes,
    keyForValue: 'notes',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT_AREA,
  },
];
