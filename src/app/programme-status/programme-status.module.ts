import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammeStatusPageRoutingModule } from './programme-status-routing.module';

import { ProgrammeStatusPage } from './programme-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgrammeStatusPageRoutingModule
  ],
  declarations: [ProgrammeStatusPage]
})
export class ProgrammeStatusPageModule {}
