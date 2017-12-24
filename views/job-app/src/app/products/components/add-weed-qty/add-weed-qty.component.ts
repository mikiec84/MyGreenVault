import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'app/products/services/product';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from 'app/shared/services/notification/notification.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'ti-add-tool-qty',
    templateUrl: './add-weed-qty.component.html',
    styleUrls: ['./add-weed-qty.component.scss']
})
export class AddWeedQtyComponent implements OnInit {
    addToolQtyForm: FormGroup;

    qtyToAdd: number;
    isAddToolQtyLoading: boolean = false;

    @Input() tool: any;

    constructor(
        private _productService: ProductService,
        private _notificationService: NotificationService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.addToolQtyForm = this._formBuilder.group({
            qtyToAdd: ['', Validators.required]
        });
    }

    saveQty() {
        this.isAddToolQtyLoading = true;
        this.tool.qty += Number(this.addToolQtyForm.controls['qtyToAdd'].value)

        this._productService.updateProduct(this.tool).subscribe(() => {
            this._notificationService.setNotificationOn('successfully added tools')
            this.qtyToAdd = null;
            Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
                this._notificationService.setNotificationOff()
            });
            this.isAddToolQtyLoading = false;
        })
    }

}
