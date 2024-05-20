import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammesPage } from './programmes.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammesPageRoutingModule {}
