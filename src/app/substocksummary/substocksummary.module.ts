import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubstocksummaryPageRoutingModule } from './substocksummary-routing.module';

import { SubstocksummaryPage } from './substocksummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubstocksummaryPageRoutingModule
  ],
  declarations: [SubstocksummaryPage]
})
export class SubstocksummaryPageModule {}
