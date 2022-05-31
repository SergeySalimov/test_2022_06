import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { InputConfigInterface, InputTypeEnum } from '../../../shared/interfaces/input-config.interface';
import { FormControl } from '@angular/forms';
import textField from '../../../../assets/textField.json';
import { TextFieldInterface } from '../../../shared/interfaces/text-field.interface';
import { phoneMaskFormatToken } from '../../../shared/shared.module';
import { PhoneMaskInterface } from '../../../shared/constants/phone-mask.constant';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInputComponent {
  @Input() config!: InputConfigInterface;
  @Input() formControlForInput!: FormControl;
  @Input() formSubmitted = false;
  inputType: typeof InputTypeEnum = InputTypeEnum;
  textField: TextFieldInterface = textField;

  constructor(@Inject(phoneMaskFormatToken) public phoneMask: PhoneMaskInterface) {
  }

  isRequired(formControl: FormControl): boolean {
    return (formControl.touched || this.formSubmitted) && formControl.invalid && formControl.hasError('required');
  }

  isEmailValid(formControl: FormControl): boolean {
  return (this.formSubmitted || formControl.touched) && formControl.invalid && formControl.hasError('email');
  }
}

