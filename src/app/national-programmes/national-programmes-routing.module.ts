import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalProgrammesPage } from './national-programmes.page';

const routes: Routes = [
  {
    path: '',
    component: NationalProgrammesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalProgrammesPageRoutingModule {}
