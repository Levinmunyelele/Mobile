import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FstockreportsPage } from './fstockreports.page';

const routes: Routes = [
  {
    path: '',
    component: FstockreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FstockreportsPageRoutingModule {}
