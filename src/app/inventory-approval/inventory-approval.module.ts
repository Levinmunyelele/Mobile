import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryApprovalPageRoutingModule } from './inventory-approval-routing.module';

import { InventoryApprovalPage } from './inventory-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryApprovalPageRoutingModule
  ],
  declarations: [InventoryApprovalPage]
})
export class InventoryApprovalPageModule {}
