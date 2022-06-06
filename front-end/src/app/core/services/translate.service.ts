import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageEnum } from '@core/constants';
import { Router } from '@angular/router';
import { AppRoutes, RouteEnum } from './routing.helper';
import { translateConfigToken } from '../../app.module';
import { TranslateConfigInterface } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private _selectedLanguage$: BehaviorSubject<LanguageEnum> = new BehaviorSubject<LanguageEnum>(this.translateConfig.default);
  public selectedLanguage$: Observable<LanguageEnum> = this._selectedLanguage$.asObservable();

  constructor(
    private readonly router: Router,
    @Inject(translateConfigToken) private readonly translateConfig: TranslateConfigInterface,
    ) {}

  changeLanguage(to: LanguageEnum): void {
    this._selectedLanguage$.next(to);
    this.softReloadPage();
  }

  getCurrentLanguage(): LanguageEnum {
    return this._selectedLanguage$.getValue();
  }

  softReloadPage(): void {
    const url = this.router.url;

    this.router
      .navigateByUrl(
        url.includes(RouteEnum.CARD)
          ? AppRoutes.TODO()
          : AppRoutes.CARD('for-soft-reload'),
        { skipLocationChange: true },
      )
      .then(() => this.router.navigateByUrl(url));
  }
}
