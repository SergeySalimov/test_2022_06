import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import { Observable } from 'rxjs';
import { MessageType } from '../../../core/interfaces/message.interface';
import { TextFieldInterface } from '../../../core/interfaces/text-field.interface';
import textField from '../../../../assets/textField.json';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowComponent {
  message$: Observable<MessageType> = this.commonService.message$;
  textField: TextFieldInterface = textField;
  constructor(private readonly commonService: CommonService) {}
  hideModal(): void {
    this.commonService.removeMessage();
  }
}
