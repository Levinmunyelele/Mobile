import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammesPageRoutingModule } from './programmes-routing.module';

import { ProgrammesPage } from './programmes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgrammesPageRoutingModule
  ],
  declarations: [ProgrammesPage]
})
export class ProgrammesPageModule {}
