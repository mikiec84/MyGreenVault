import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { SidebarService } from './sidebar';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable()
export class OperatorsService {
    
    private _operatorsSubject$: BehaviorSubject<Operator[]> = new BehaviorSubject<Operator[]>(null);
    public readonly operators$: Observable<Operator[]> = this._operatorsSubject$.asObservable();

    private _moreOperatorsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreOperators$: Observable<boolean> = this._moreOperatorsSubject$.asObservable();

    private _operatorsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public readonly operatorsSkip$: Observable<number> = this._operatorsSkipSubject$.asObservable();

    private _operatorsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(8);
    public readonly operatorsTake$: Observable<number> = this._operatorsSkipSubject$.asObservable();

    private _isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isLoading$: Observable<boolean> = this._isLoadingSubject$.asObservable();

    private _activeOperatorSubject$: BehaviorSubject<Operator> = new BehaviorSubject<Operator>(null);
    public readonly activeOperator$: Observable<Operator> = this._activeOperatorSubject$.asObservable();


    constructor(
        private _http: Http,
        private _sidebarService: SidebarService
        ) {
    }

    addOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/operator/', operator, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getOperators() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isLoadingSubject$.next(true);
        return this._http.get(`/api/v1/operators?skip=${this._operatorsSkipSubject$.value}&take=${this._operatorsTakeSubject$.value}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._isLoadingSubject$.next(false);
            this._operatorsSubject$.next(res.json().data)
            this._moreOperatorsSubject$.next(res.json().more);
            this._operatorsSkipSubject$.next(res.json().skip);
            this._operatorsTakeSubject$.next(res.json().take);
        });
    }


    updateOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/update-operator', operator, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    setActiveOperator(operatorId: string): void {
        let activeoperator = this.operators$.map(operators => operators.filter(operator => operator._id === operatorId)[0]).subscribe(activeoperator => {
            this._activeOperatorSubject$.next(activeoperator);
        });
    }


    removeOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/remove-operator', operator, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    nextPage() {
        this._operatorsSkipSubject$.next(this._operatorsSkipSubject$.value + this._operatorsTakeSubject$.value);
        this.getOperators().first().subscribe();
    }

    previousPage() {
        if(this._operatorsSkipSubject$.value >= this._operatorsTakeSubject$.value) {
            this._operatorsSkipSubject$.next(this._operatorsSkipSubject$.value - this._operatorsTakeSubject$.value);
            this.getOperators().first().subscribe();
        }
    }

}

export interface Operator {
  companyName: string;
  contactEmail: string;
  contactName: string;
  operatorId: number;
  operatorName: string;
  process: number;
  operatorNumber: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface PagedList {
    skip: number,
    take: number,
    more: boolean,
    data: Operator[]
}