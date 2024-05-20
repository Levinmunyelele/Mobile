import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockReportsPage } from './stock-reports.page';

const routes: Routes = [
  {
    path: '',
    component: StockReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockReportsPageRoutingModule {}
