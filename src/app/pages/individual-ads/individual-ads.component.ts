import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AdsIndividualDetailsComponent } from '../ads-individual-details/ads-individual-details.component';
import * as $ from 'jquery';

import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'
import { MatPaginator, PageEvent,MatPaginatorIntl } from '@angular/material/paginator';
export interface AdsImport {
  user: any;
  type: any;
  make: any;
  created_at: any;
  status: any;
  option: any;
}

@Component({
    selector: 'app-individual-ads',
    templateUrl: './individual-ads.component.html',
    styleUrls: ['./individual-ads.component.scss'],
})
export class IndividualAdsComponent implements OnInit {
  @ViewChild('error_pagination')
  paginator!: MatPaginator;
  buscador: any
  pagesize: number = 25;
  p = 1;
  offset: number = 0;
  total: number = 0;
  constructor(
      private AdsService:AdsService,
      private router: Router,
      public dialog: MatDialog,
      private changeDetectorRefs: ChangeDetectorRef,
      private paginatord: MatPaginatorIntl 

  ) {
    this.paginatord.itemsPerPageLabel = "Registros por página";
   }

  ngOnInit(): void {
    this.getAds()
  }

  redirect(path :any){
    this.router.navigate([path])
  }
  //ads = [];
  displayedColumns: string[] = ['select','user', 'type', 'make', 'created_at', 'status', 'option'];
  dataSource = new MatTableDataSource<AdsImport>([]);
  data:any[] = [];
  type:any = 'auto'
  date:any = null
  sort:any = 0
  next_page_url:any = null
  user_id:any = null
  selection = new SelectionModel<AdsImport>(true, []);
  loading = true
  end = false
   button_disabled = true
  
  showFile(name:any,user_id:any){
    this.router.navigate(['admin/products-massive-import',{name, user_id}])
  }

  getDate($event:any){
    this.date = new Date($event.target.value).toISOString().split('T')[0] 
    this.getAds()
  }
  getType($event:any){
    this.type = $event.target.value
    this.getAds()
  }
  getSort($event:any){
    this.sort = $event.target.value
    this.getAds()
  }

  showDetails(element:any){
    this.dialog.open(AdsIndividualDetailsComponent, {
      data : {ad : element} 
    });
  }

  ApprovedRejected(status:any){
    var ad_ids: any[] = []
    this.selection.selected.forEach((row:any)=>{
      ad_ids.push(row.id) 
    })
    
    this.AdsService.acceptRejectAd(status, this.user_id ,ad_ids).then((res:any) => {
      console.log('este es el arreglo',ad_ids.length)
      let palabra
      let palabraRe
      if(ad_ids.length>1){
        palabra='¡Anuncios aprobados!';
        palabraRe='¡Anuncios rechazado!';
      }else{
        palabra='¡Anuncio aprobado!';
        palabraRe='¡Anuncio rechazado!';
      }
      this.dialog.open(AlertMessageComponent, {
        data :  {
          message : status  === 'approved' ? palabra : palabraRe, 
          ad_accepted : status  === 'approved' ? true : null, 
          ad_rejected : status  === 'rejected' ? true : null, 
          anuncios :ad_ids
        }
      });
      this.getAds()
    }).catch(err =>{
      console.log(err)
    })
  }


   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

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
        this.dataSource.data.forEach((row:any) => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAds(){
    this.AdsService.GetAdIndividual(this.type,this.date,this.sort).subscribe((res:any) => {
      
      res.data.data.forEach((ad:any)  =>{
        if(ad.auto_ad) ad.auto_ad.created_at = new Date(ad.auto_ad.created_at).toLocaleDateString() 
        if(ad.mechanic_ad) ad.mechanic_ad.created_at = new Date(ad.mechanic_ad.created_at).toLocaleDateString() 
        if(ad.mobile_home_ad) ad.mobile_home_ad.created_at = new Date(ad.mobile_home_ad.created_at).toLocaleDateString() 
        if(ad.moto_ad) ad.moto_ad.created_at = new Date(ad.moto_ad.created_at).toLocaleDateString() 
        if(ad.rental_ad) ad.rental_ad.created_at = new Date(ad.rental_ad.created_at).toLocaleDateString() 
        if(ad.shop_ad) ad.shop_ad.created_at = new Date(ad.shop_ad.created_at).toLocaleDateString() 
        if(ad.truck_ad) ad.truck_ad.created_at = new Date(ad.truck_ad.created_at).toLocaleDateString() 
      })

      this.data = res.data.data
      this.dataSource = new MatTableDataSource<AdsImport>(this.data);
      this.total = res.data.total;
      this.next_page_url = res.data.next_page_url
    })
  }

  onScrollDown(){
    this.data=[]
    // var scroll : any = $("body");
    //console.log(scroll[0].scrollHeight +"=="+ Number($event.currentScrollPosition).toFixed())
    //if(scroll[0].scrollHeight == Number($event.currentScrollPosition).toFixed()){
      // if(!this.end){
   
        // this.AdsService.GetAdNextPageUrl(this.next_page_url,this.type,this.date,this.sort)
        this.AdsService.GetAdNextPageUrl(this.type,this.date,this.sort,this.p,this.pagesize,this.buscador).then((res:any) => {
          
          res.data.data.forEach((ad:any)  =>{
            if(ad.auto_ad) ad.auto_ad.created_at = new Date(ad.auto_ad.created_at).toLocaleDateString() 
            if(ad.mechanic_ad) ad.mechanic_ad.created_at = new Date(ad.mechanic_ad.created_at).toLocaleDateString() 
            if(ad.mobile_home_ad) ad.mobile_home_ad.created_at = new Date(ad.mobile_home_ad.created_at).toLocaleDateString() 
            if(ad.moto_ad) ad.moto_ad.created_at = new Date(ad.moto_ad.created_at).toLocaleDateString() 
            if(ad.rental_ad) ad.rental_ad.created_at = new Date(ad.rental_ad.created_at).toLocaleDateString() 
            if(ad.shop_ad) ad.shop_ad.created_at = new Date(ad.shop_ad.created_at).toLocaleDateString() 
            if(ad.truck_ad) ad.truck_ad.created_at = new Date(ad.truck_ad.created_at).toLocaleDateString() 
          })

          this.data.push(...res.data.data) 
          this.dataSource = new MatTableDataSource<AdsImport>(this.data);
          this.next_page_url =  res.data.next_page_url == null ? this.end = true : res.data.next_page_url;  
        }).catch((err:any) =>{
          console.log(err)
        })
      // }
    //} 
  }

  nextPage(value: PageEvent) {
    
    this.pagesize = value.pageSize;
    this.offset = value.pageIndex * value.pageSize;
    console.log('pagina',value.pageIndex )
    this.p=value.pageIndex+1 
    this.onScrollDown();
}

busqueda(){
  console.log('buscaodr',this.buscador)
  this.onScrollDown()
}
}
  