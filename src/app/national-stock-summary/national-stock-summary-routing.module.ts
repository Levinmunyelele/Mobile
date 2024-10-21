import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalStockSummaryPage } from './national-stock-summary.page';

const routes: Routes = [
  {
    path: '',
    component: NationalStockSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalStockSummaryPageRoutingModule {}
