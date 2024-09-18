import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalhomePageRoutingModule } from './nationalhome-routing.module';

import { NationalhomePage } from './nationalhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalhomePageRoutingModule
  ],
  declarations: [NationalhomePage]
})
export class NationalhomePageModule {}
