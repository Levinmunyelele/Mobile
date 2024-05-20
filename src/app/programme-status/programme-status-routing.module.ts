import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammeStatusPage } from './programme-status.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammeStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammeStatusPageRoutingModule {}
