import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalStockSummaryPageRoutingModule } from './national-stock-summary-routing.module';

import { NationalStockSummaryPage } from './national-stock-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalStockSummaryPageRoutingModule
  ],
  declarations: [NationalStockSummaryPage]
})
export class NationalStockSummaryPageModule {}
