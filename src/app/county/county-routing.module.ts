import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountyPage } from './county.page';

const routes: Routes = [
  {
    path: '',
    component: CountyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class CountyPageRoutingModule {}
