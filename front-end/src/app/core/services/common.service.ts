import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageInterface, MessageType } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _loaderStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this._loaderStatus$.asObservable();
  private _message$: BehaviorSubject<MessageType> = new BehaviorSubject<MessageType>(null);
  public message$: Observable<MessageType> = this._message$.asObservable();

  showLoader(): void {
    this._loaderStatus$.next(true);
  }

  hideLoader(): void {
    this._loaderStatus$.next(false);
  }

  addMessage(message: MessageInterface): void {
    this._message$.next(message);
  };

  removeMessage(): void {
    this._message$.next(null);
  }
}
