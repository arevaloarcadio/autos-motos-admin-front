import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';


import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
  
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    constructor(
        private AdsService:AdsService,
        private router: Router,

    ) { }

  ngOnInit(): void {
     
   
    
    this.AdsService.GetBySource().then(res => {
      this.ads = res.data
    }).catch(err =>{
      console.log(err)
    })
  }

  ngAfterViewInit(){
    
  }


  picker = ''
  dateStart:any;
  dateEnd:any;  
  filters:any = [];
  ads :any;
  start : any;
  end:any;

  getDate($event : any,input : string){
    this.start = '';
    this.end = '';

    input  == 'start' ? 
    this.dateStart = new Date($event.target.value).toISOString().split('T')[0] : 
    this.dateEnd = new Date($event.target.value).toISOString().split('T')[0];
    
    if(this.dateStart != null && this.dateEnd != null){
      $event.target.value = ''
      this.filters.push({start : this.dateStart.split('-')[2]+'/'+this.dateStart.split('-')[1] , end :this.dateEnd.split('-')[2]+'/'+this.dateEnd.split('-')[1]})
      
      this.AdsService.GetBySourceDate(this.dateStart,this.dateEnd).then(res => {
       
        this.ads = res.data
      }).catch(err =>{
        console.log(err)
      })
    }
  }
}
  