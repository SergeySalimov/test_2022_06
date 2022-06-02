import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateDirective } from './directives/truncate.directive';
import { DATE_TIME_FORMAT, DATE_TIME_FORMAT_NGX } from '../core/constants/date-time.constant';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomNgxDatetimeAdapter } from './utils/custom-ngx-datetime.adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { PHONE_MASK, MaskInterface, ZIPCODE_MASK } from '../core/constants/masks.constant';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

export const dateTimeFormatToken: InjectionToken<string> = new InjectionToken('date-time');
export const phoneMaskFormatToken: InjectionToken<MaskInterface> = new InjectionToken('phone-mask-format');
export const zipcodeMaskFormatToken: InjectionToken<MaskInterface> = new InjectionToken('zipcode-mask-format');

@NgModule({
  declarations: [
    TruncateDirective,
    LoaderComponent,
    ModalWindowComponent,
  ],
  imports: [
    CommonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxMaskModule,
  ],
  exports: [
    TruncateDirective,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxMaskModule,
    LoaderComponent,
    ModalWindowComponent,
  ],
  providers: [
    { provide: dateTimeFormatToken, useValue: DATE_TIME_FORMAT },
    { provide: phoneMaskFormatToken, useValue: PHONE_MASK },
    { provide: zipcodeMaskFormatToken, useValue: ZIPCODE_MASK },
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT_NGX },
    MaskPipe,
  ],
})
export class SharedModule { }
