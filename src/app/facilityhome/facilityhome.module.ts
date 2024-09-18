import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilityhomePageRoutingModule } from './facilityhome-routing.module';

import { FacilityhomePage } from './facilityhome.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacilityhomePageRoutingModule
  ],
  declarations: [FacilityhomePage]
})
export class FacilityhomePageModule {}
