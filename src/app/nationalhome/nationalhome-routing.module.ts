import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalhomePage } from './nationalhome.page';

const routes: Routes = [
  {
    path: '',
    component: NationalhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalhomePageRoutingModule {}
