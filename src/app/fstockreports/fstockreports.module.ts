import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FstockreportsPageRoutingModule } from './fstockreports-routing.module';

import { FstockreportsPage } from './fstockreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FstockreportsPageRoutingModule
  ],
  declarations: [FstockreportsPage]
})
export class FstockreportsPageModule {}
