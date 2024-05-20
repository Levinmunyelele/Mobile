import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReportsPageRoutingModule } from './stock-reports-routing.module';

import { StockReportsPage } from './stock-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReportsPageRoutingModule
  ],
  declarations: [StockReportsPage]
})
export class StockReportsPageModule {}
