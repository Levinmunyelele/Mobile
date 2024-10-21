import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventorySummaryPageRoutingModule } from './inventory-summary-routing.module';

import { InventorySummaryPage } from './inventory-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventorySummaryPageRoutingModule
  ],
  declarations: [InventorySummaryPage]
})
export class InventorySummaryPageModule {}
