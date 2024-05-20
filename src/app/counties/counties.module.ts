import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountiesPageRoutingModule } from './counties-routing.module';

import { CountiesPage } from './counties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountiesPageRoutingModule
  ],
  declarations: [CountiesPage]
})
export class CountiesPageModule {}
