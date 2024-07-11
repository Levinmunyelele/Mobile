import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountiesPage } from './counties.page';

const routes: Routes = [
  {
    path: '',
    component: CountiesPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'stock-reports', loadChildren: () => import('../stock-reports/stock-reports.module').then(m => m.StockReportsPageModule) },
      { path: 'helper', loadChildren: () => import('../helper/helper.module').then(m => m.HelperPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) },
      {
        path: 'programmes',
        loadChildren: () => import('../programmes/programmes.module').then( m => m.ProgrammesPageModule)
      },
    
      { path: '', redirectTo: 'home', pathMatch: 'full' } 
    ]
  
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountiesPageRoutingModule {}
