import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const DEFAULT_NOTIFICATION_TIME: number = 5000;


@Injectable()
export class NotificationService {

    private _isNotificationOnSubject$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
    public readonly isNotificationOn$: Observable<boolean> = this._isNotificationOnSubject$.asObservable();

    private _notificationTextSubject$: BehaviorSubject<string> = new BehaviorSubject<any>('');
    public readonly notificationText$: Observable<string> = this._notificationTextSubject$.asObservable();

    private _notificationBootstrapClassSubject: BehaviorSubject<string> = new BehaviorSubject<string>('success');
    public readonly notificationBootstrapClass$: Observable<string> = this._notificationBootstrapClassSubject.asObservable();

    private _isUnderConstructionSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isUnderConstruction$: Observable<boolean> = this._isUnderConstructionSubject$.asObservable();

    constructor(private toastr: ToastrService) { }

    setNotificationOn(notificationText: string = '', notificationBootstrapClass: string = 'success') {
        this._notificationTextSubject$.next(notificationText);
        this._isNotificationOnSubject$.next(true);
        this._notificationBootstrapClassSubject.next(notificationBootstrapClass);

        Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
            this._isNotificationOnSubject$.next(false);
        });
    }

    setNotificationOff() {
        this._notificationTextSubject$.next('');
        this._isNotificationOnSubject$.next(false);
    }

    showSuccess(msg: string) {
        this.toastr.success(msg);
    }

    turnOnConstruction() {
        this._isUnderConstructionSubject$.next(true);
    }

    turnOffConstruction() {
        this._isUnderConstructionSubject$.next(false);
    }

}
