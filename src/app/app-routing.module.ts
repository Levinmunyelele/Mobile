import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



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
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  {
    path: 'inventory-form',
    loadChildren: () => import('./inventory-form/inventory-form.module').then( m => m.InventoryFormPageModule)
  },
  {
    path: 'inventory-item',
    loadChildren: () => import('./inventory-item/inventory-item.module').then( m => m.InventoryItemPageModule)
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
    path: 'programme-status',
    loadChildren: () => import('./programme-status/programme-status.module').then( m => m.ProgrammeStatusPageModule)
  },
  {
    path: 'facilities',
    loadChildren: () => import('./facilities/facilities.module').then( m => m.FacilitiesPageModule)
  },
  {
    path: 'sub-counties',
    loadChildren: () => import('./sub-counties/sub-counties.module').then( m => m.SubCountiesPageModule)
  },
  {
    path: 'counties',
    loadChildren: () => import('./counties/counties.module').then( m => m.CountiesPageModule)
  },
  {
    path: 'national',
    loadChildren: () => import('./national/national.module').then( m => m.NationalPageModule)
  },
  {
    path: 'county',
    loadChildren: () => import('./county/county.module').then( m => m.CountyPageModule)
  },
   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
