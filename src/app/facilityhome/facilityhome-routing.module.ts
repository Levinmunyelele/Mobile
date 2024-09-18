import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard'; 

import { FacilityhomePage } from './facilityhome.page';

const routes: Routes = [
  {
    path: '',
    component: FacilityhomePage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityhomePageRoutingModule {}
