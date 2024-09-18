import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilitystockreportsPageRoutingModule } from './facilitystockreports-routing.module';

import { FacilitystockreportsPage } from './facilitystockreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacilitystockreportsPageRoutingModule
  ],
  declarations: [FacilitystockreportsPage]
})
export class FacilitystockreportsPageModule {}
