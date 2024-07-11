import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { IonicModule } from '@ionic/angular';

import { CountyPageRoutingModule } from './county-routing.module';

import { CountyPage } from './county.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountyPageRoutingModule,
    HighchartsChartModule
  ],
  declarations: [CountyPage]
})
export class CountyPageModule {}
