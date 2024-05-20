import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.page.html',
  styleUrls: ['./inventory-item.page.scss'],
})
export class InventoryItemPage implements OnInit {

  inventoryDataForm!: FormGroup; // Define a FormGroup to hold your form controls

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.initForm(); // Initialize the form when the component is initialized
    this.loadInventory();
  }

  initForm(): void {
    this.inventoryDataForm = this.fb.group({
      facilityName: [''],
      date: [''],
      programmeName: [''],
      inventoryStatusName: ['']
    });
  }
  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(
      (data: any[]) => { // Specify the type of data as an array
        console.log('Data received from service:', data);
        if (data && data.length > 0) {
          // Assuming you only want to display the first item in the array
          const firstItem = data[3];
          if (this.inventoryDataForm) {
            this.inventoryDataForm.patchValue({
              facilityName: firstItem.facilityName,
              date: `${firstItem.month},${firstItem.year}`,
              programmeName: firstItem.programmeName,
              inventoryStatusName: firstItem.inventoryStatusName
            });
          } else {
            console.error('Form not initialized.');
          }
        } else {
          console.error('No inventory data found.');
        }
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      }
    );
  }
}  