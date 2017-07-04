import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {

  private _isNotificationOnSubject$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  public readonly isNotificationOn$: Observable<boolean> = this._isNotificationOnSubject$.asObservable();

  private _notificationTextSubject$: BehaviorSubject<string> = new BehaviorSubject<any>('');
  public readonly notificationText$: Observable<string> = this._notificationTextSubject$.asObservable();

  constructor() { }

  setNotificationOn(notificationText: string = '') {
    this._notificationTextSubject$.next(notificationText);
    this._isNotificationOnSubject$.next(true);
  }

  setNotificationOff() {
    this._notificationTextSubject$.next('');
    this._isNotificationOnSubject$.next(false);
  }

}
