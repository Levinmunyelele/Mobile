import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountiesPage } from './counties.page';

const routes: Routes = [
  {
    path: '',
    component: CountiesPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      {
        path: 'county-stock-reports',
        loadChildren: () => import('../county-stock-reports/county-stock-reports.module').then(m => m.CountyStockReportsPageModule)},
      { path: 'helper', loadChildren: () => import('../helper/helper.module').then(m => m.HelperPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
      {
        path: 'programmes',
        loadChildren: () => import('../programmes/programmes.module').then(m => m.ProgrammesPageModule)
      },
      {
        path: 'county',
        loadChildren: () => import('../county/county.module').then(m => m.CountyPageModule)
      },

      { path: '', redirectTo: 'county', pathMatch: 'full' }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountiesPageRoutingModule { }
