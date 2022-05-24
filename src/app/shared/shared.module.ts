import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TruncateDirective} from "./directive/truncate.directive";
import { DATE_TIME_FORMAT } from "./constant/date-time.constant";

export const dateTimeFormatToken: InjectionToken<string> = new InjectionToken('date-time');

@NgModule({
  declarations: [
    TruncateDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TruncateDirective,
  ],
  providers: [
    { provide: dateTimeFormatToken, useValue: DATE_TIME_FORMAT },
  ],
})
export class SharedModule { }
