import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { MassiveImportComponent } from '../massive-import/massive-import.component';
import { MassiveImportUploadComponent } from '../massive-import-upload/massive-import-upload.component';
import { MassiveImportUploadFileComponent } from '../massive-import-upload-file/massive-import-upload-file.component';
import { DetailsCsvAdsComponent } from '../details-csv-ads/details-csv-ads.component';
import { CommentRejectedComponent } from '../comment-rejected/comment-rejected.component';
import { IndividualAdsComponent } from '../individual-ads/individual-ads.component';
import { UsersTableComponent } from '../users-table/users-table.component';

const routes: Routes = [
  {
	path: '',
    component:LayoutComponent,
    children:[
    	{
        path: '',
        component: DashboardComponent
      },
      {
        path: 'table',
        component: DashboardTableComponent
      },
      {
        path: 'products-massive-import',
        component: MassiveImportComponent
      },
      {
        path: 'products-massive-import/:csv_ad_id/:user_id',
        component: DetailsCsvAdsComponent
      },
      {
        path: 'comments-rejected/:csv_ad_id/:user_id',
        component: CommentRejectedComponent
      },
      {
        path: 'products-massive-import-upload',
        component: MassiveImportUploadComponent
      },
      {
        path: 'products-massive-import-upload-file',
        component: MassiveImportUploadFileComponent
      },
      {
        path: 'products-individual-ads',
        component: IndividualAdsComponent
      },
      {
        path: 'users',
        component: UsersTableComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
