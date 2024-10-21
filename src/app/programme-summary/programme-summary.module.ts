import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammeSummaryPageRoutingModule } from './programme-summary-routing.module';

import { ProgrammeSummaryPage } from './programme-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgrammeSummaryPageRoutingModule
  ],
  declarations: [ProgrammeSummaryPage]
})
export class ProgrammeSummaryPageModule {}
