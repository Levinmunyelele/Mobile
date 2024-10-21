import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountyStockReportsPage } from './county-stock-reports.page';

const routes: Routes = [
  {
    path: '',
    component: CountyStockReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountyStockReportsPageRoutingModule {}
