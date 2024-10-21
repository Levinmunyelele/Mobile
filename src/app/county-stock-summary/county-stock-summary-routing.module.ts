import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountyStockSummaryPage } from './county-stock-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CountyStockSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountyStockSummaryPageRoutingModule {}
