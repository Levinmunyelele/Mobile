import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 
import { NotificationComponent } from './notification/notification.component'; 

const routes: Routes = [
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsPageModule) },
  { path: 'terms-nconditions', loadChildren: () => import('./terms-nconditions/terms-nconditions.module').then(m => m.TermsNconditionsPageModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyPageModule) },
  { path: 'home', loadChildren: () => import('./login2/login2.module').then(m => m.Login2PageModule) },
  { path: '', redirectTo: 'login2', pathMatch: 'full' },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'validate', loadChildren: () => import('./validate/validate.module').then(m => m.ValidatePageModule) },
  { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule), canActivate: [AuthGuard] },
  {
    path: 'inventory-form',
    loadChildren: () => import('./inventory-form/inventory-form.module').then( m => m.InventoryFormPageModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then( m => m.Login2PageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule) 
  },
  {
    path: 'programmes',
    loadChildren: () => import('./programmes/programmes.module').then( m => m.ProgrammesPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'facilities',
    loadChildren: () => import('./facilities/facilities.module').then( m => m.FacilitiesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sub-counties',
    loadChildren: () => import('./sub-counties/sub-counties.module').then( m => m.SubCountiesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'counties',
    loadChildren: () => import('./counties/counties.module').then( m => m.CountiesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'national',
    loadChildren: () => import('./national/national.module').then( m => m.NationalPageModule),
    canActivate: [AuthGuard]
  },
  
  { path: 'notification', component: NotificationComponent },
 
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'inventory-item',
    loadChildren: () => import('./inventory-item/inventory-item.module').then( m => m.InventoryItemPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'facilitystockreports',
    loadChildren: () => import('./facilitystockreports/facilitystockreports.module').then( m => m.FacilitystockreportsPageModule)
  },
  {
    path: 'fstockreports',
    loadChildren: () => import('./fstockreports/fstockreports.module').then( m => m.FstockreportsPageModule)
  },
  {
    path: 'substocksummary',
    loadChildren: () => import('./substocksummary/substocksummary.module').then( m => m.SubstocksummaryPageModule)
  },

  {
    path: 'stock-reports',
    loadChildren: () => import('./stock-reports/stock-reports.module').then( m => m.StockReportsPageModule)
  },  {
    path: 'inventory-approval',
    loadChildren: () => import('./inventory-approval/inventory-approval.module').then( m => m.InventoryApprovalPageModule)
  },

     
];
   


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
