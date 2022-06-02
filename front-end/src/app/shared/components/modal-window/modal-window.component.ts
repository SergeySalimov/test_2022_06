import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonService } from '@core/services';
import { Observable } from 'rxjs';
import { MessageType, MessageTypeEnum, TextFieldInterface } from '@core/interfaces';
import textField from '@textField';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowComponent {
  message$: Observable<MessageType> = this.commonService.message$;
  textField: TextFieldInterface = textField;
  messageTypeEnum: typeof MessageTypeEnum = MessageTypeEnum;
  constructor(private readonly commonService: CommonService) {}
  hideModal(): void {
    this.commonService.removeMessage();
  }
}
