import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TodoListItem } from '../../../shared/interface/to-do-page.interface';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import textField from '../../../../assets/textField.json';
import { RouteEnum } from '../../../shared/constant/route.enum';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProfileComponent implements OnInit {
  textField = textField;
  route: typeof RouteEnum = RouteEnum;
  @Input() todoItem!: TodoListItem | null;

  constructor(@Inject(dateTimeFormatToken) public dateTimeFormat: string) {
  }

  ngOnInit(): void {
  }

}
