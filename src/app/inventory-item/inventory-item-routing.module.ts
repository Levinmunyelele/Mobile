import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryItemPage } from './inventory-item.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryItemPageRoutingModule {}
