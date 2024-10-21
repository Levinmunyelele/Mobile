import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountyStockSummaryPageRoutingModule } from './county-stock-summary-routing.module';

import { CountyStockSummaryPage } from './county-stock-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountyStockSummaryPageRoutingModule
  ],
  declarations: [CountyStockSummaryPage]
})
export class CountyStockSummaryPageModule {}
