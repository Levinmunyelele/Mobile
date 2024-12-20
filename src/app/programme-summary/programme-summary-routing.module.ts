import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammeSummaryPage } from './programme-summary.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammeSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammeSummaryPageRoutingModule {}
