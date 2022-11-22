import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { SidebarModule } from '@coreui/angular';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule  } from '@angular/material/table';
import { MatIconModule  } from '@angular/material/icon';
import { MatSelectModule  } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { MassiveImportComponent } from '../massive-import/massive-import.component';
import { IndividualAdsComponent } from '../individual-ads/individual-ads.component';
import { MassiveImportUploadComponent } from '../massive-import-upload/massive-import-upload.component';
import { MassiveImportUploadFileComponent } from '../massive-import-upload-file/massive-import-upload-file.component';
import { AdsIndividualDetailsComponent } from '../ads-individual-details/ads-individual-details.component';
import { DetailsCsvAdsComponent } from '../details-csv-ads/details-csv-ads.component';
import { CommentRejectedComponent } from '../comment-rejected/comment-rejected.component';
import { UsersTableComponent } from '../users-table/users-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LucideAngularModule, icons } from 'lucide-angular';
//import {MatProgressBarModule} from '@angular/material'


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    DashboardTableComponent,
    MassiveImportComponent,
    MassiveImportUploadComponent,
    MassiveImportUploadFileComponent,
    IndividualAdsComponent,
    AlertMessageComponent,
    DetailsCsvAdsComponent,
    AdsIndividualDetailsComponent,
    CommentRejectedComponent,
    UsersTableComponent
    
  ],
  imports: [
    LayoutRoutingModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CdkAccordionModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
    LucideAngularModule.pick(icons),
    InfiniteScrollModule
  ],
  providers: [  
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  exports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class LayoutModule { }
