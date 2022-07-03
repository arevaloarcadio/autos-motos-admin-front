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
    selector: 'app-comment-rejected',
    templateUrl: './comment-rejected.component.html',
    styleUrls: ['./comment-rejected.component.scss'],
})
export class CommentRejectedComponent implements OnInit {

    constructor(
        private AdsService:AdsService,
        private UserService:UserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog

    ) { }

    ngOnInit(): void {
     
      if(this.ad_id = this.route.snapshot.queryParams["ad_id"]){
        this.AdsService.getAdById(this.ad_id).then((res:any) => {
          this.ad = res.data;
        }).catch(err =>{
          console.log(err)
        })
      }

      this.ad_length = this.route.snapshot.queryParams["ad_length"] ?? null

      this.user_id = this.route.snapshot.paramMap.get("user_id");
      this.csv_ad_id = this.route.snapshot.paramMap.get("csv_ad_id");

      this.UserService.getUserById(this.user_id).then((res:any) => {
        this.user = res.data;
      }).catch(err =>{
        console.log(err)
      })
    }
  
  user :any =  null;
  csv_ad_id : any = null;
  user_id : any = null;
  ad_id : any = null;
  ad : any = null;
  ad_length : any = null;
  comment : any = null;
  loading : any = false
  redirect(path :any){
    this.router.navigate([path])
  }

  goBackPage(){
    console.log(this.router)
    //this.router.goBack()
  }

  sendRejected(){
    this.loading = true
    this.comment = $('#comment').val()
    console.log(this.comment)
    this.AdsService.commentRejectAd(this.ad_id,this.comment).then((res:any) => {
     // this.loading = false
      this.dialog.open(AlertMessageComponent, {
        data :  {message : '¡Mensaje enviado con éxito!', error : null , success : true}  ,
      });
    }).catch(err =>{
      //this.loading = false
      console.log(err)
      this.dialog.open(AlertMessageComponent, {
        data :  {message : '¡Error al enviar el mensaje', error : true , success : false}  ,
      });
    })
  }

   sendRejecteds(){
    this.loading = true
    this.comment = $('#comment').val()
    
    this.AdsService.commentRejectAds(this.csv_ad_id,this.comment).then((res:any) => {
     // this.loading = false
      this.dialog.open(AlertMessageComponent, {
        data :  {message : '¡Mensaje enviado con éxito!', error : null , success : true}  ,
      });
    }).catch(err =>{
      //this.loading = false
      console.log(err)
      this.dialog.open(AlertMessageComponent, {
        data :  {message : '¡Error al enviar el mensaje', error : true , success : false}  ,
      });
    })
  }

}
  