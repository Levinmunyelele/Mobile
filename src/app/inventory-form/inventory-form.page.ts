import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { LoadingController } from '@ionic/angular';


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
  loading: any;
  constructor(
    private router: Router,
    private httpclient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private loadingController: LoadingController
  ) {
    this.reactiveForm = new FormGroup({
      beginningBalance: new FormControl(null, [Validators.required]),
      received: new FormControl(null, [Validators.required]),
      dispensed: new FormControl(null, [Validators.required]),
      losses: new FormControl(null, [Validators.required]),
      positiveAdjustment: new FormControl(null, [Validators.required]),
      negativeAdjustment: new FormControl(null, [Validators.required]),
      endingBalance: new FormControl({ value: null, disabled: false }),
      quantityRequested: new FormControl(null, [Validators.required]),
      daysOutOfStock: new FormControl(null, [Validators.required]),
      comments: new FormControl('')
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
          this.loadInventoryData(this.inventoryId, this.drugId);
        }
      }
    });
  }
  loadDrugName(drugId: number) {
    this.inventoryService.loadDrugName(drugId).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.drugName = response.drugName;
        console.log('Fetched drug name:', this.drugName);
      },
      error => {
        console.error('Error fetching drug name:', error);
      }
    );
  }

  loadInventoryData(inventoryId: number, drugId: number) {
    this.inventoryService.getInventoryLineByDrugId('?drugId=' + drugId).subscribe(
      data => {
        if (data.length > 0) {
          const inventoryLine = data[data.length - 1];

          const { endingBalance, ...inventoryDataWithoutEndingBalance } = inventoryLine;

          console.log('Loaded data:', inventoryDataWithoutEndingBalance);

          this.reactiveForm.patchValue(inventoryDataWithoutEndingBalance);
        }
      },
      error => {
        console.error('Error fetching inventory data:', error);
      }
    );
  }

  calculateEndingBalance() {
    const beginningBalance = parseFloat(this.reactiveForm.get('beginningBalance')?.value || '0');
    const received = parseFloat(this.reactiveForm.get('received')?.value || '0');
    const dispensed = parseFloat(this.reactiveForm.get('dispensed')?.value || '0');
    const losses = parseFloat(this.reactiveForm.get('losses')?.value || '0');
    const positiveAdjustment = parseFloat(this.reactiveForm.get('positiveAdjustment')?.value || '0');
    const negativeAdjustment = parseFloat(this.reactiveForm.get('negativeAdjustment')?.value || '0');

    const availableStock = beginningBalance + received + positiveAdjustment - negativeAdjustment - dispensed - losses;

    this.reactiveForm.get('dispensed')?.setErrors(null);
    this.reactiveForm.get('losses')?.setErrors(null);
    this.reactiveForm.get('negativeAdjustment')?.setErrors(null);

    if (dispensed > availableStock) {
      this.reactiveForm.get('dispensed')?.setErrors({ exceedsEndingBalance: true });
    }

    if (losses > availableStock) {
      this.reactiveForm.get('losses')?.setErrors({ exceedsEndingBalance: true });
    }

    if (negativeAdjustment > availableStock) {
      this.reactiveForm.get('negativeAdjustment')?.setErrors({ exceedsEndingBalance: true });
    }

    let endingBalance = beginningBalance + received - dispensed - losses + positiveAdjustment - negativeAdjustment;

    if (endingBalance < 0) {
      this.reactiveForm.get('endingBalance')?.setErrors({ negativeBalance: true });
      endingBalance = 0;
    } else {
      this.reactiveForm.get('endingBalance')?.setErrors(null);
    }

    this.reactiveForm.get('endingBalance')?.setValue(endingBalance, { emitEvent: false });
  }


  async onSubmit() {
    const formValue = this.reactiveForm.getRawValue();

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
      quantityToOrder: formValue.quantityToOrder,
      quantityIssued: formValue.quantityIssued,
      averageMonthlyConsumption: formValue.averageMonthlyConsumption,
      computedEndingBalance: formValue.endingBalance,
      monthsOfStock: formValue.monthsOfStock,
      daysOutOfStock: formValue.daysOutOfStock,
      adjustedConsumption: formValue.adjustedConsumption,
      receivedFromSubCounty: formValue.receivedFromSubCounty,
      notes: formValue.notes,
    };

    console.log('Submitting inventory data:', updatedInventoryData);

    this.loading = await this.loadingController.create({
      message: 'Saving data...',
    });

    await this.loading.present();

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
      },
      () => {
        this.loading.dismiss();
      }
    );
  }


  goBack() {
    this.router.navigate(['/inventory-item'], {
      queryParams: { programmeId: this.programmeId }
    });
  }
}
