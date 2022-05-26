import { InputConfigInterface } from '../../shared/interfaces/input-config.interface';
import textField from '../../../assets/textField.json';

export const inputConfig: Array<InputConfigInterface> = [
  {
    name: textField.card.createdAt,
    keyForValue: 'createdAt',
    editable: false,
    position: 'left',
    pipe: 'date',
  },
  {
    name: textField.card.name,
    keyForValue: 'name',
    editable: true,
    position: 'left',
    inputType: 'text',
  },
  {
    name: textField.card.surname,
    keyForValue: 'surname',
    editable: true,
    position: 'left',
    inputType: 'text',
  },
  {
    name: textField.card.patronymic,
    keyForValue: 'patronymic',
    editable: true,
    position: 'left',
    inputType: 'text',
  },
  {
    name: textField.card.email,
    keyForValue: 'email',
    editable: true,
    position: 'left',
    inputType: 'text',
  },
  {
    name: textField.card.phone,
    keyForValue: 'phone',
    editable: true,
    position: 'right',
    inputType: 'number',
  },
  {
    name: textField.card.zipCode,
    keyForValue: 'zipCode',
    editable: true,
    position: 'right',
    inputType: 'number',
  },
  {
    name: textField.card.city,
    keyForValue: 'city',
    editable: true,
    position: 'right',
    inputType: 'text',
  },
  {
    name: textField.card.address,
    keyForValue: 'address',
    editable: true,
    position: 'right',
    inputType: 'textArea',
  },
  {
    name: textField.card.notes,
    keyForValue: 'notes',
    editable: true,
    position: 'right',
    inputType: 'textArea',
  },
];
