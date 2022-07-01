import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: '<div *ngIf="showLoader$ | async" class="loading">Loading&#8230;</div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  showLoader$: Observable<boolean> = this.commonService.showLoader$;
  constructor(private readonly commonService: CommonService) { }
}
