import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'app/plants/services/sale.service';
import { markAsTouched } from 'app/shared/utilities/forms';

import { Unit } from '../../models';

@Component({
  selector: 'gv-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  @Input() plantNumber: number;
  @Input() showSellButton: boolean = true;

  defaultIsQuantity = false;
  saleForm: FormGroup;
  Unit = Unit;

  sellingPlantLoading$ = this._saleService.sellingPlantLoading$;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _saleService: SaleService) {
    this.createForm();
  }

  createForm() {
    this.saleForm = this._formBuilder.group({
      isQuantity: [this.defaultIsQuantity, Validators.required],
      quantity: [null, Validators.required],
      weight: [null, Validators.required],
      unit: [Unit.grams, Validators.required],
      cost: [null, Validators.required]
    });

    if (this.defaultIsQuantity) {
      this.enableQuantityForm();
      this.disableWeightForm();
    } else {
      this.enableWeightForm();
      this.disableQuantityForm();
    }
  }

  get isQuantity(): boolean {
    return this.saleForm.controls.isQuantity.value;
  }

  get isWeight(): boolean {
    return !this.isQuantity;
  }

  get unitLabel(): string {
    if (this.isQuantity === true) {
      return 'Qty';
    }

    if (this.isQuantity === false) {
      return 'Weight';
    }
  }

  sellProduct() {
    if (this.saleForm.valid) {
      const saleRequest = {
        ...this.saleForm.value,
        plantNumber: this.plantNumber
      };

      this._saleService.sellProduct(saleRequest);
    } else {
      markAsTouched(this.saleForm);
    }
  }

  ngOnInit() {
    this.saleForm.controls.isQuantity.valueChanges.subscribe(isQuantity => {
      const isWeight = !isQuantity;

      if (isQuantity) {
        this.enableQuantityForm();
        this.disableWeightForm();
        this.saleForm.updateValueAndValidity();
      } else if (isWeight) {
        this.enableWeightForm();
        this.disableQuantityForm();
        this.saleForm.updateValueAndValidity();
      }
    });

    this._saleService.saleSucceded$.subscribe(() => {
      this.resetForm();
    });
  }

  private resetForm(): void {
    this.saleForm.controls.quantity.setValue(null);
    this.saleForm.controls.weight.setValue(null);
    this.saleForm.controls.cost.setValue(null);

    this.saleForm.controls.quantity.markAsPending();
    this.saleForm.controls.weight.markAsPending();
    this.saleForm.controls.cost.markAsPending();
  }

  private enableQuantityForm(): void {
    this.saleForm.controls.quantity.enable();
  }

  private enableWeightForm(): void {
    this.saleForm.controls.weight.enable();
    this.saleForm.controls.unit.enable();
  }

  private disableQuantityForm(): void {
    this.saleForm.controls.quantity.disable();
  }

  private disableWeightForm(): void {
    this.saleForm.controls.weight.disable();
    this.saleForm.controls.unit.disable();
  }

  get weight() {
    return this.saleForm.get('weight');
  }

  get quantity() {
    return this.saleForm.get('quantity');
  }

  get cost() {
    return this.saleForm.get('cost');
  }

  get unitCode() {
    return this.saleForm.get('unit').value;
  }
}