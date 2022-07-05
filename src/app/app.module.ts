import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//import { SidebarModule } from '@coreui/angular';


/*import { LandingComponent } from './pages/landing/landing.component';
import { CompararComponent } from './pages/buyer/comparar/comparar.component'
import { LayoutComponent } from './pages/layout/layout.component';

import { SignupComponent } from './pages/signup/signup.component';
import { SignupProfComponent } from './pages/signup-prof/signup-prof.component';
import { SellerLayoutComponent } from './pages/layout/seller-layout/seller-layout.component';
import { InicioComponent } from './pages/seller/inicio/inicio.component';*/

import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    /*LandingComponent,
    LayoutComponent,
    CompararComponent,
    SignupComponent,
    SignupProfComponent,
    SellerLayoutComponent,
    InicioComponent,*/
    LoginComponent,
  ],
  imports: [
    //SidebarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
