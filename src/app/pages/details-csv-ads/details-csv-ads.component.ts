import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { UserService } from 'src/app/services/user/user.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AdsDetailsComponent } from '../ads-details/ads-details.component';


export interface AdsImport {
  title: any;
  type: any;
  make: any;
  model: any;
  price: any;
}

//import { INavData }  from '@coreui/angular';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-details-csv-ads',
    templateUrl: './details-csv-ads.component.html',
    styleUrls: ['./details-csv-ads.component.scss'],
})
export class DetailsCsvAdsComponent implements OnInit {

    constructor(
        private AdsService:AdsService,
        private UserService:UserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog

    ) { }

    ngOnInit(): void {
      
      this.getData()

      this.user_id = this.route.snapshot.paramMap.get("user_id");
      
      this.UserService.getUserById(this.user_id).then((res:any) => {
        this.loading = false
        this.user = res.data;
      }).catch(err =>{
        console.log(err)
      })
    }

  redirect(path :any){
    this.router.navigate([path])
  }
  //ads = [];
  displayedColumns: string[] = ['select','title', 'type', 'make', 'model', 'price', 'option'];
  dataSource = [];

  selection = new SelectionModel<AdsImport>(true, []);
  user :any =  null;
  csv_ad_id : any = null;
  user_id : any = null;
  button_disabled = true
  loading = true
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    
    if(numSelected >= 1){
      $('#accept').removeAttr('disabled')
      $('#reject').removeAttr('disabled')
    }else{
      $('#reject').attr('disabled','true')
      $('#accept').attr('disabled','true')
    }
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach((row:any) => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getData(){
    this.csv_ad_id = this.route.snapshot.paramMap.get("csv_ad_id");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
      
    this.AdsService.GetByCsv(this.csv_ad_id).then(res => {
      this.dataSource = res.data;

      console.log('esta es  la informa',res)
    }).catch(err =>{
      console.log(err)
    })
  }

  showDetails(element:any){
    this.dialog.open(AdsDetailsComponent, {
      data : {ad : element, user : this.user} 
    });
  }

  ApprovedRejected(status:any){
    console.log(this.selection)
    var ad_ids: any[]= []
    this.selection.selected.forEach((row:any)=>{
      ad_ids.push(row.id) 
    })
    
    this.AdsService.acceptRejectAd(status, this.user_id ,ad_ids).then((res:any) => {
      this.dialog.open(AlertMessageComponent, {
        data :  {
          message : status  === 'approved' ? '¡Anuncios aprobados!' : '¡Anuncios rechazado!', 
          ad_accepted : status  === 'approved' ? true : null, 
          ad_rejected : status  === 'rejected' ? true : null, 
          csv_ad_id : this.csv_ad_id,
          user_id : this.user_id,
          ad_id : ad_ids.length == 1 ? ad_ids[0] : null,
          ad_length : ad_ids.length ,
          anuncios :ad_ids
        }
      });
      this.getData()
    }).catch(err =>{
      console.log(err)
    })
  }
}
  