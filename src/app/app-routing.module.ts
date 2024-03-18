import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsPageModule) },
  { path: 'terms-nconditions', loadChildren: () => import('./terms-nconditions/terms-nconditions.module').then(m => m.TermsNconditionsPageModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyPageModule) },
  { path: 'home', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'validate', loadChildren: () => import('./validate/validate.module').then(m => m.ValidatePageModule) },
  { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
