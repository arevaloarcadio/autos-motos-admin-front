import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
//import { SidebarModule } from '@coreui/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateModalComponent } from './pages/categories/create-modal/create-modal.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MaterialModule } from './material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SendEmailModalComponent } from './pages/send-email-modal/send-email-modal.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
    UserDetailsComponent,
    SendEmailModalComponent,
    CategoriesComponent,
    CreateModalComponent,
  ],
  imports: [
    //SidebarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgSelectModule,
    LucideAngularModule.pick(icons),
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
