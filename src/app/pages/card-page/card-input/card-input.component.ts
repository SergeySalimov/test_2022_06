import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputConfigInterface } from '../../../shared/interfaces/input-config.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInputComponent {
  @Input() config!: InputConfigInterface;
  @Input() formControlForInput!: FormControl;

  getClasses(): Record<string, boolean> {
    return {
      'notEmpty': !!this.formControlForInput.value,
      'app-disabled': this.formControlForInput.disabled,
      'input-invalid': this.formControlForInput.invalid && this.formControlForInput.untouched,
    };
  }
}
