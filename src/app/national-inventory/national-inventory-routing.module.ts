import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalInventoryPage } from './national-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: NationalInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalInventoryPageRoutingModule {}
