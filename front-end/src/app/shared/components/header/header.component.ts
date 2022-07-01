import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  currentDateTime$: Observable<Date> = timer(0, 1000).pipe(
    map(() => new Date()),
  );
}
