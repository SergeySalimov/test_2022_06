import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const DATE_TIME_FORMAT = 'dd-MM-yyyy HH:mm:ss';

export const DATE_TIME_FORMAT_NGX: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'DD-MM-YYYY HH:mm:ss',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
