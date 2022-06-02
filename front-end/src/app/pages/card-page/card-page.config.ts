import {
  ErrorTypeEnum,
  InputConfigInterface,
  InputErrorConfigInterface,
  InputPositionEnum,
  InputTypeEnum,
  PipeTypeEnum
} from '../../core/interfaces/input-config.interface';
import textField from '../../../assets/textField.json';
import { Validators } from '@angular/forms';

const MAX_LENGTH = 30;
const MAX_LENGTH_TEXTAREA = 100;

export const inputErrorMap: Array<InputErrorConfigInterface> = [
  { type: ErrorTypeEnum.REQUIRED, text: textField.errors.inputErrors.required },
  { type: ErrorTypeEnum.EMAIL, text: textField.errors.inputErrors.email },
  { type: ErrorTypeEnum.MAX_LENGTH, text: textField.errors.inputErrors.maxLength },
];

export const inputConfig: Array<InputConfigInterface> = [
  {
    name: textField.card.createdAt,
    keyForValue: 'createdAt',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.DATE_TIME,
    pipe: PipeTypeEnum.DATE,
    validators: Validators.required,
  },
  {
    name: textField.card.name,
    keyForValue: 'name',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
    validators: [Validators.required, Validators.maxLength(MAX_LENGTH)],
  },
  {
    name: textField.card.surname,
    keyForValue: 'surname',
    editable: true,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
    validators: Validators.maxLength(MAX_LENGTH),
  },
  {
    name: textField.card.patronymic,
    keyForValue: 'patronymic',
    editable: false,
    position: InputPositionEnum.LEFT,
    inputType: InputTypeEnum.TEXT,
    validators: Validators.maxLength(MAX_LENGTH),
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
  },
  {
    name: textField.card.zipCode,
    keyForValue: 'zipCode',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.NUMBER,
    validators: [Validators.maxLength(6)],
  },
  {
    name: textField.card.city,
    keyForValue: 'city',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT,
    validators: Validators.maxLength(MAX_LENGTH),
  },
  {
    name: textField.card.address,
    keyForValue: 'address',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT_AREA,
    validators: Validators.maxLength(MAX_LENGTH_TEXTAREA),
  },
  {
    name: textField.card.notes,
    keyForValue: 'notes',
    editable: true,
    position: InputPositionEnum.RIGHT,
    inputType: InputTypeEnum.TEXT_AREA,
    validators: Validators.maxLength(MAX_LENGTH_TEXTAREA),
  },
];
