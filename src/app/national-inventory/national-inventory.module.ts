import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalInventoryPageRoutingModule } from './national-inventory-routing.module';

import { NationalInventoryPage } from './national-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalInventoryPageRoutingModule
  ],
  declarations: [NationalInventoryPage]
})
export class NationalInventoryPageModule {}
