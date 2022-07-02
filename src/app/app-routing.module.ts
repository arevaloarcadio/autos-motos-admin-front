import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
/*import { LandingComponent } from './pages/landing/landing.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SellerLayoutComponent } from './pages/layout/seller-layout/seller-layout.component';
import { SignupProfComponent } from './pages/signup-prof/signup-prof.component';
import { SignupComponent } from './pages/signup/signup.component';
*/
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
 
  {
    path: '',
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component:LoginComponent
      },
      {
        path: 'admin',
        loadChildren: () =>
              import('./pages/layout/layout.module').then((m) => m.LayoutModule)

      },

    ],
  },
  /*{
    path: 'landing',
    component:LandingComponent
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  {
    path: 'signup_pro',
    component:SignupProfComponent
  },*/
  
   
  /*{
    path: 'seller',
    component:SellerLayoutComponent,
    loadChildren: () => import('./pages/seller/seller/seller.module').then( m => m.SellerModule)
  },*/
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
