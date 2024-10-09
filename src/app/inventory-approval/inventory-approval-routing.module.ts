import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryApprovalPage } from './inventory-approval.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryApprovalPageRoutingModule {}
