import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubstocksummaryPage } from './substocksummary.page';

const routes: Routes = [
  {
    path: '',
    component: SubstocksummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubstocksummaryPageRoutingModule {}
