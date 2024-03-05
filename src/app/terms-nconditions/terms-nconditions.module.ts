import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsNconditionsPageRoutingModule } from './terms-nconditions-routing.module';

import { TermsNconditionsPage } from './terms-nconditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsNconditionsPageRoutingModule
  ],
  declarations: [TermsNconditionsPage]
})
export class TermsNconditionsPageModule {}
