import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubhomePageRoutingModule } from './subhome-routing.module';

import { SubhomePage } from './subhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubhomePageRoutingModule
  ],
  declarations: [SubhomePage]
})
export class SubhomePageModule {}
