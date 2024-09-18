import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  reactiveForm: FormGroup;
  drugName: string = '';
  drugId: number | null = null;
  programmeId: number | null = null;
  inventoryId: number | null = null;

  constructor(
    private router: Router,
    private httpclient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService
  ) {
    this.reactiveForm = new FormGroup({
      beginningBalance: new FormControl(null, [Validators.required]),
      received: new FormControl(null, [Validators.required]),
      dispensed: new FormControl(null, [Validators.required]),
      losses: new FormControl(null, [Validators.required]),
      positiveAdjustment: new FormControl(null, [Validators.required]),
      negativeAdjustment: new FormControl(null, [Validators.required]),
      endingBalance: new FormControl({ value: null, disabled: true }),
      quantityRequested: new FormControl(null, [Validators.required]),
      daysOutOfStock: new FormControl(null, [Validators.required]),
      comments: new FormControl(''),
    });

    this.reactiveForm.valueChanges.subscribe(() => {
      this.calculateEndingBalance();
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.inventoryId = params['inventoryId'] ? +params['inventoryId'] : null;
      this.drugId = params['drugId'] ? +params['drugId'] : null;
      this.programmeId = params['programmeId'] ? +params['programmeId'] : null;

      console.log('Retrieved drugId:', this.drugId);
      console.log('Retrieved programmeId:', this.programmeId);
      console.log('Retrieved inventoryId:', this.inventoryId);

      if (this.drugId) {
        this.loadDrugName(this.drugId);
        if (this.inventoryId) {
          this.loadInventoryData(this.inventoryId,this.drugId);
        }
      }
    });
  }
  loadDrugName(drugId: number) {
    this.httpclient.get(`http://qualipharmapi.local/v1/drugs/${drugId}`)
      .subscribe(
        (response: any) => {
          this.drugName = response.drugName;
          console.log('Fetched drug name:', this.drugName);
        },
        error => {
          console.error('Error fetching drug name:', error);
        }
      );
  }

  loadInventoryData(inventoryId: number,drugId:number) {
    this.inventoryService.getInventoryLineByDrugId('?drugId='+drugId).subscribe(
      data => {
        if (data.length > 0){
        this.reactiveForm.patchValue(data[data.length-1]);
        }
      },
      error => {
        console.error('Error fetching inventory data:', error);
      }
    );
  }

  calculateEndingBalance() {
    const beginningBalance = this.reactiveForm.get('beginningBalance')?.value || 0;
    const received = this.reactiveForm.get('received')?.value || 0;
    const dispensed = this.reactiveForm.get('dispensed')?.value || 0;
    const losses = this.reactiveForm.get('losses')?.value || 0;
    const positiveAdjustment = this.reactiveForm.get('positiveAdjustment')?.value || 0;
    const negativeAdjustment = this.reactiveForm.get('negativeAdjustment')?.value || 0;

    const endingBalance = beginningBalance + received - dispensed - losses + positiveAdjustment - negativeAdjustment;
    this.reactiveForm.get('endingBalance')?.setValue(endingBalance, { emitEvent: false });
  }

  onSubmit() {
    const formValue = this.reactiveForm.getRawValue();

    if (!this.inventoryId) {
      console.error('Inventory ID is not set');
      return;
    }

    const updatedInventoryData = {
      inventoryId: this.inventoryId,
      drugId: this.drugId,
      beginningBalance: formValue.beginningBalance,
      received: formValue.received,
      dispensed: formValue.dispensed,
      losses: formValue.losses,
      positiveAdjustment: formValue.positiveAdjustment,
      negativeAdjustment: formValue.negativeAdjustment,
      endingBalance: formValue.endingBalance,
      quantityRequested: formValue.quantityRequested,
      quantityToOrder: 0,
      quantityIssued: 0,
      averageMonthlyConsumption: 0,
      computedEndingBalance: formValue.endingBalance,
      monthsOfStock: 0,
      daysOutOfStock: formValue.daysOutOfStock,
      adjustedConsumption: 0,
      receivedFromSubCounty: 0,
      notes: formValue.comments
    };

    console.log('Submitting inventory data:', updatedInventoryData);

    this.inventoryService.saveInventoryData(updatedInventoryData).subscribe(
      response => {
        console.log('Inventory data saved:', response);
        this.router.navigate(['/inventory-item'], {
          queryParams: {
            programmeId: this.programmeId,
            inventoryId: this.inventoryId,
            drugId: this.drugId
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      },
      error => {
        console.error('Error saving inventory data:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/inventory-item'], {
      queryParams: { programmeId: this.programmeId }
    });
  }
}
