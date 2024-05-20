import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HighchartsChartModule } from 'highcharts-angular';


// import { InventoryItemModule } from '../inventory-item/inventory-item.module';



import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HighchartsChartModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
