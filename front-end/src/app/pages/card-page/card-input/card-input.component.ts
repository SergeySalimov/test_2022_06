import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { ErrorTypeEnum, InputConfigInterface, InputErrorConfigInterface, InputTypeEnum } from '@core/interfaces';
import { FormControl } from '@angular/forms';
import { dateTimeFormatToken, phoneMaskFormatToken, zipcodeMaskFormatToken } from '@shared/shared.module';
import { MaskInterface } from '@core/constants';
import { inputErrorMap } from '../card-page.config';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInputComponent {
  @Input() config!: InputConfigInterface;
  @Input() formControlForInput!: FormControl;
  @Input() formSubmitted = false;
  @Input() editMode!: boolean;
  inputType: typeof InputTypeEnum = InputTypeEnum;
  errorMap: Array<InputErrorConfigInterface> = inputErrorMap;

  constructor(
    @Inject(phoneMaskFormatToken) public phoneMask: MaskInterface,
    @Inject(zipcodeMaskFormatToken) public zipcodeMask: MaskInterface,
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    private readonly maskPipe: MaskPipe,
    ) {}

  getMaskedInputValue(value: string | null, mask: MaskInterface): string {
    return value ? `${mask.prefix} ${this.maskPipe.transform(value, mask.data)}` : '';
  }

  isErrorOnInput(formControl: FormControl, errorCode: ErrorTypeEnum): boolean {
    return (formControl.touched || this.formSubmitted) && formControl.invalid && formControl.hasError(errorCode) && this.editMode;
  }
}

