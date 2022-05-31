import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import {
  InputConfigInterface,
  PipeTypeEnum,
  PossibleInputType
} from '../../../shared/interfaces/input-config.interface';
import { dateTimeFormatToken, phoneMaskFormatToken } from '../../../shared/shared.module';
import { PhoneMaskInterface } from '../../../shared/constants/phone-mask.constant';
import { TextFieldInterface } from '../../../shared/interfaces/text-field.interface';
import textField from '../../../../assets/textField.json';

@Component({
  selector: 'app-readonly-input',
  template: `
    <ng-container [ngSwitch]="config.pipe">
      <p *ngSwitchCase="pipeEnum.DATE">
        {{ config.name }}: <span *ngIf="value; else noData">{{ value | date: dateTimeFormat }}</span>
      </p>
      <p *ngSwitchCase="pipeEnum.PHONE">
        {{ config.name }}: <span *ngIf="value; else noData">{{ phoneMask.prefix }} {{ $any(value) | mask: phoneMask.data }}</span>
      </p>
      <p *ngSwitchDefault>{{ config.name }}: <span *ngIf="value; else noData">{{ value }}</span></p>
      <ng-template #noData>
        <span class="no-data-text">{{ textField.common.noData }}</span>
      </ng-template>
    </ng-container>
  `,
  styles: [
      `@import "../../../../../src/styles";
      .no-data-text { color: $appDarkGray }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInputReadonlyComponent {
  @Input() config!: InputConfigInterface;
  @Input() value!: PossibleInputType;

  textField: TextFieldInterface = textField;
  pipeEnum: typeof PipeTypeEnum = PipeTypeEnum;

  constructor(
    @Inject(dateTimeFormatToken) public dateTimeFormat: string,
    @Inject(phoneMaskFormatToken) public phoneMask: PhoneMaskInterface,
  ) {
  }
}
