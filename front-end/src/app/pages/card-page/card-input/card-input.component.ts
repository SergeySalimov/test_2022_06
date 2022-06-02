import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import {
  ErrorTypeEnum,
  InputConfigInterface,
  InputErrorConfigInterface,
  InputTypeEnum
} from '../../../core/interfaces/input-config.interface';
import { FormControl } from '@angular/forms';
import { phoneMaskFormatToken } from '../../../shared/shared.module';
import { MaskInterface } from '../../../core/constants/phone-mask.constant';
import { inputErrorMap } from '../card-page.config';

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
  @Input() editMode!: boolean;
  inputType: typeof InputTypeEnum = InputTypeEnum;
  errorMap: Array<InputErrorConfigInterface> = inputErrorMap;

  constructor(@Inject(phoneMaskFormatToken) public phoneMask: MaskInterface) {}

  isErrorOnInput(formControl: FormControl, errorCode: ErrorTypeEnum): boolean {
    return (formControl.touched || this.formSubmitted) && formControl.invalid && formControl.hasError(errorCode) && this.editMode;
  }
}

