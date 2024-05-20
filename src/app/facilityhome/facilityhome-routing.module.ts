import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityhomePage } from './facilityhome.page';

const routes: Routes = [
  {
    path: '',
    component: FacilityhomePage
  },
  {
    path: 'inventory',
    loadChildren: () => import('../inventory/inventory.module').then( m => m.InventoryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityhomePageRoutingModule {}
