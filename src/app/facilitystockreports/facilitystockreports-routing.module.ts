import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilitystockreportsPage } from './facilitystockreports.page';

const routes: Routes = [
  {
    path: '',
    component: FacilitystockreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilitystockreportsPageRoutingModule {}
