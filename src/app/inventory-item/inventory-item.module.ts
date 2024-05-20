import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


import { IonicModule } from '@ionic/angular';

import { InventoryItemPageRoutingModule } from './inventory-item-routing.module';

import { InventoryItemPage } from './inventory-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryItemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InventoryItemPage]
})
export class InventoryItemPageModule {}
