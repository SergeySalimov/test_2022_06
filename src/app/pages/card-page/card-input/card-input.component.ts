import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { dateTimeFormatToken } from '../../../shared/shared.module';
import { InputConfigInterface, PossibleInputType } from '../../../shared/interfaces/input-config.interface';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInputComponent implements OnInit {
  @Input() config!: InputConfigInterface;
  @Input() value!: PossibleInputType;
  @Input() disable: boolean = true;

  constructor(@Inject(dateTimeFormatToken) public dateTimeFormat: string) {
  }

  ngOnInit(): void {
  }

}
