import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { InputConfigInterface, PossibleInputType } from '../../../shared/interfaces/input-config.interface';
import { dateTimeFormatToken } from '../../../shared/shared.module';

@Component({
  selector: 'app-readonly-input',
  template: `
    <p *ngIf="!config.pipe">{{ config.name }}: {{ value || '&#8213;' }}</p>
    <p *ngIf="config.pipe === 'date'">{{ config.name }}: {{ value | date: dateTimeFormat || '&#8213;' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInputReadonlyComponent {
  @Input() config!: InputConfigInterface;
  @Input() value!: PossibleInputType;

  constructor(@Inject(dateTimeFormatToken) public dateTimeFormat: string) {
  }
}
