import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalProgrammesPageRoutingModule } from './national-programmes-routing.module';

import { NationalProgrammesPage } from './national-programmes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalProgrammesPageRoutingModule
  ],
  declarations: [NationalProgrammesPage]
})
export class NationalProgrammesPageModule {}
