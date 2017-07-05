import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { OperatorsService, IOperator } from '../../services/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';


@Component({
  selector: 'ti-update-operator',
  templateUrl: './update-operator.component.html',
  styleUrls: ['./update-operator.component.scss']
})
export class UpdateOperatorComponent implements OnInit {

  activeOperatorFormGroup: FormGroup;

  @Input('skip') skip: number;
  @Input('take') take: number;

  @Output('closeUpdateModal')
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('isLoading')
  isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeOperatorSubscription$: Subscription;

  private _activeOperator: any;
  get activeOperator(): any {
    return this._activeOperator;
  }
  @Input('activeOperator')
  set activeOperator(activeOperator: any) {
    activeOperator.subscribe(activeOperator => {
      this._activeOperator = activeOperator;
    })
  }

  constructor(
    private _fb: FormBuilder,
    private _operatorsService: OperatorsService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createGroup();
  }

  ngOnDestroy() {
    if(this.activeOperatorSubscription$)
      this.activeOperatorSubscription$.unsubscribe()
  }


  createGroup() {
    this.activeOperatorFormGroup = this._fb.group({
        operatorName: [this.activeOperator.operatorName, Validators.required],
        operatorNumber: [this.activeOperator.operatorNumber, Validators.required],
        _id: [this.activeOperator._id, Validators.required]
    });
  }

  updateOperator(activeOperator) {
    this.activeOperatorSubscription$ = this._operatorsService.updateOperator(this.activeOperatorFormGroup.value).subscribe(data => {
      
      this._operatorsService.getOperators().finally(() => {
        this._notificationService.setNotificationOn('Successfully updated operator');
        Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
          this._notificationService.setNotificationOff();
        });
     
      }).subscribe(() => {
        
      })
      this.closeModal();
    });
  }

  closeModal() {
    this.closeUpdateModal.emit(true);
  }

}
