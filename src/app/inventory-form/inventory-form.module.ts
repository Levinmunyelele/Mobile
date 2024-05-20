import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { IonicModule } from '@ionic/angular';

import { InventoryFormPageRoutingModule } from './inventory-form-routing.module';

import { InventoryFormPage } from './inventory-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InventoryFormPageRoutingModule
  ],
  declarations: [InventoryFormPage]
})
export class InventoryFormPageModule {}
