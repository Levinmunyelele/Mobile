import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubhomePage } from './subhome.page';

const routes: Routes = [
  {
    path: '',
    component: SubhomePage,
  },
  // {
  //   path: 'inventory',
  //   loadChildren: () => import('../inventory/inventory.module').then( m => m.InventoryPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubhomePageRoutingModule {}
