import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalStockReportsPageRoutingModule } from './national-stock-reports-routing.module';

import { NationalStockReportsPage } from './national-stock-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalStockReportsPageRoutingModule
  ],
  declarations: [NationalStockReportsPage]
})
export class NationalStockReportsPageModule {}
