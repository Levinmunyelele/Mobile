import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  reactiveForm: FormGroup;

  constructor(private router: Router, private httpclient: HttpClient) {
    this.reactiveForm = new FormGroup({
      beginningBalance: new FormControl(null, [Validators.required]),
      received: new FormControl(null, [Validators.required]),
      dispensed: new FormControl(null, [Validators.required]),
      losses: new FormControl(null, [Validators.required]),
      positiveAdjustment: new FormControl(null, Validators.required),
      negativeAdjustment: new FormControl(null, Validators.required),
      endingBalance: new FormControl(null, Validators.required),
      quantityRequested: new FormControl(null, Validators.required),
      daysOutOfStock: new FormControl(null, Validators.required),
      comments: new FormControl(null, Validators.required),
    });

    this.reactiveForm.valueChanges.subscribe(() => {
      this.calculateEndingBalance();
    });
  }

  ngOnInit() {}

  calculateEndingBalance() {
    const beginningBalanceControl = this.reactiveForm.get('beginningBalance');
    const receivedControl = this.reactiveForm.get('received');
    const dispensedControl = this.reactiveForm.get('dispensed');
    const lossesControl = this.reactiveForm.get('losses');
    const positiveAdjustmentControl = this.reactiveForm.get('positiveAdjustment');
    const negativeAdjustmentControl = this.reactiveForm.get('negativeAdjustment');
  
    if (beginningBalanceControl && receivedControl && dispensedControl &&
        lossesControl && positiveAdjustmentControl && negativeAdjustmentControl) {
      const beginningBalance = beginningBalanceControl.value || 0;
      const received = receivedControl.value || 0;
      const dispensed = dispensedControl.value || 0;
      const losses = lossesControl.value || 0;
      const positiveAdjustment = positiveAdjustmentControl.value || 0;
      const negativeAdjustment = negativeAdjustmentControl.value || 0;
  
      const endingBalance = beginningBalance + received + positiveAdjustment - (dispensed + losses + negativeAdjustment);
      this.reactiveForm.patchValue({ endingBalance: endingBalance });
    }
  }
  

  onSubmit() {
    if (this.reactiveForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.reactiveForm.value);
      this.reactiveForm.reset();
    } else {
      // Mark all fields as touched to display validation errors
      this.reactiveForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/facilities/facilityhome/inventory']);
  }
}
