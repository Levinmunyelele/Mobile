import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCountiesPageRoutingModule } from './sub-counties-routing.module';

import { SubCountiesPage } from './sub-counties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCountiesPageRoutingModule
  ],
  declarations: [SubCountiesPage]
})
export class SubCountiesPageModule {}
