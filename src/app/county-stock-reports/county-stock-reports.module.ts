import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountyStockReportsPageRoutingModule } from './county-stock-reports-routing.module';

import { CountyStockReportsPage } from './county-stock-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountyStockReportsPageRoutingModule
  ],
  declarations: [CountyStockReportsPage]
})
export class CountyStockReportsPageModule {}
