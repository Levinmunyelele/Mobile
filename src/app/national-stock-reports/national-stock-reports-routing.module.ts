import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalStockReportsPage } from './national-stock-reports.page';

const routes: Routes = [
  {
    path: '',
    component: NationalStockReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalStockReportsPageRoutingModule {}
