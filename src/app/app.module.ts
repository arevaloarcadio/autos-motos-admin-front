import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
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
import { UserFormComponent } from './pages/user-form/user-form.component';



import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from './pages/shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SendEmailModalComponent } from './pages/send-email-modal/send-email-modal.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
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
    UserFormComponent,
    UserDetailsComponent,
    SendEmailModalComponent,
  ],
  imports: [
    //SidebarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [   { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
