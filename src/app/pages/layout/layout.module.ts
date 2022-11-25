import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { SidebarModule } from '@coreui/angular';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MaterialModule } from '../../material/material.module';

import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL',
  },
  display: {
      dateInput: 'D-MM-Y',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    CdkAccordionModule,
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    LayoutRoutingModule,
    LucideAngularModule.pick(icons),
    MaterialModule,
    SharedModule
  ],
  providers: [  
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: MY_FORMATS},
  ]
})
export class LayoutModule { }
