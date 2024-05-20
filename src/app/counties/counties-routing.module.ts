import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountiesPage } from './counties.page';

const routes: Routes = [
  {
    path: '',
    component: CountiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountiesPageRoutingModule {}
