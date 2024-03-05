import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsNconditionsPage } from './terms-nconditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsNconditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsNconditionsPageRoutingModule {}
