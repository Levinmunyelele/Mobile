import { FacilitystockreportsPage } from '../facilitystockreports/facilitystockreports.page';
import { FacilityhomePage } from './../facilityhome/facilityhome.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilitiesPage } from './facilities.page';
import { HomePage } from '../home/home.page';
import { HelperPage } from '../helper/helper.page';
import { ProfilePage } from '../profile/profile.page';



const routes: Routes = [
  {
    path: '',
    component: FacilitiesPage,
    children: [
      {
        path: 'facilityhome',
        loadChildren: () => import('../facilityhome/facilityhome.module').then( m => m.FacilityhomePageModule)
      },      { path: 'facilitystockreports', loadChildren: () => import('../facilitystockreports/facilitystockreports.module').then(m => m.FacilitystockreportsPageModule) },
      { path: 'helper', loadChildren: () => import('../helper/helper.module').then(m => m.HelperPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
      {
        path: 'programmes',
        loadChildren: () => import('../programmes/programmes.module').then( m => m.ProgrammesPageModule)
      },
    
      { path: '', redirectTo: 'facilityhome', pathMatch: 'full' } ,

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilitiesPageRoutingModule {}
