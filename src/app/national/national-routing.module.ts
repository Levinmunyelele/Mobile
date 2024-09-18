import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalPage } from './national.page';

import { HomePage } from '../home/home.page';
import { StockReportsPage } from '../stock-reports/stock-reports.page';
import { HelperPage } from '../helper/helper.page';

import { ProfilePage } from '../profile/profile.page';


const routes: Routes = [
  {
    path: '',
    component: NationalPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'stock-reports', loadChildren: () => import('../stock-reports/stock-reports.module').then(m => m.StockReportsPageModule) },
      { path: 'helper', loadChildren: () => import('../helper/helper.module').then(m => m.HelperPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
      {
        path: 'programmes',
        loadChildren: () => import('../programmes/programmes.module').then( m => m.ProgrammesPageModule)
      },
      {
        path: 'nationalhome',
        loadChildren: () => import('../nationalhome/nationalhome.module').then( m => m.NationalhomePageModule)
      },
    
      { path: '', redirectTo: 'nationalhome', pathMatch: 'full' } 
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalPageRoutingModule {}
