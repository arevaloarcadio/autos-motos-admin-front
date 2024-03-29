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
import { SendEmailModalComponent } from '../send-email-modal/send-email-modal.component';
import { Location } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface UserImport {
  user: any;
  type: any;
  email: any;
  status: any;
}

//import { INavData }  from '@coreui/angular';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-users-table',
    // standalone: true,
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
    // imports:[MatPaginatorModule]
})
export class UsersTableComponent implements OnInit {
  @ViewChild('error_pagination')
  paginator!: MatPaginator;
  buscador: any
  pagesize: number = 25;
  p = 1;
  offset: number = 0;
  total: number = 0;
  constructor(
    private AdsService:AdsService,
    private UserService:UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public location:Location
  ){}

  ngOnInit(): void {
    this.getUsers()
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  redirect(path :any){
    this.router.navigate([path])
  }
  //ads = [];
  displayedColumns: string[] = ['user', 'type', 'email', 'status', 'option'];
  dataSource = new MatTableDataSource<UserImport>([]);
  data :any[] = [];
  //selection = new SelectionModel<AdsImport>(true, []);
  user :any =  null;
  csv_ad_id : any = null;
  user_id : any = null;
  button_disabled = true
  loading = true
  next_page_url : any = null
  
  type:any = null
  dateStart:any = null
  dateEnd:any = null 
  status:any = null

 

  start : any;
  end:any;

  getDate($event : any,input : string){
    console.log($event)
    this.start = '';
    this.end = '';

    input  == 'start' ? 
    this.dateStart = new Date($event.target.value).toISOString().split('T')[0] : 
    this.dateEnd = new Date($event.target.value).toISOString().split('T')[0];
    this.getUsers()
  }

  getType($event:any){
    
    if($event.target.value == 'Tipo de vendedor')
      this.type = null
    else  
      this.type = $event.target.value
    
    this.getUsers()
  }
  getStatus($event:any){
    
    if($event.target.value == 'Todos')
      this.status = null
    else  
      this.status = $event.target.value
    
    this.getUsers()
  }

  /*isAllSelected() {
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
  }*/

  getUsers(){
    this.UserService.getUsers(this.type,this.dateStart,this.dateEnd,this.status).then((res:any)  => {
      console.log(res)
      this.dataSource = new MatTableDataSource<UserImport>(res.data.data);
      this.next_page_url =  res.data.next_page_url == null ? this.end = true : res.data.next_page_url;

     
                this.total = res.data.total;
    }).catch(err =>{
      console.log(err)
    })
  }

  showDetails(element:any){
    this.dialog.open(AdsDetailsComponent, {
      data : {ad : element, user : this.user} 
    });
  }

 

  changeStatus(status : any,user_id: any){
    this.UserService.setStatusUser(status,user_id).then(res => {
      this.getUsers()
    }).catch(err =>{
      console.log(err)
    })
  }

  onScrollDown(){
    // var scroll : any = $("body");

    
    //console.log(scroll[0].scrollHeight +"=="+ Number($event.currentScrollPosition).toFixed())
    //if(scroll[0].scrollHeight == Number($event.currentScrollPosition).toFixed()){
      // if(!this.end){
        this.UserService.GetAdNextPageUrl(this.type,this.dateStart,this.dateEnd,this.status,this.p,this.pagesize,this.buscador)
        .then(res => {
          this.dataSource = new MatTableDataSource<UserImport>(res.data.data);
          // this.getUsers()
        }).catch(err =>{
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

    this.UserService.getNextPage(this.p, this.pagesize, this.offset)
        .then(res => {
          this.dataSource = new MatTableDataSource<UserImport>(res.data.data);
        }).catch(err =>{
          console.log(err)
        })
    //this.onScrollDown();
}

sendEmail(id: any) {
  this.dialog.open(SendEmailModalComponent, {
    data : {id : id} 
  });
}

busqueda(){
  console.log('buscaodr',this.buscador)
  this.onScrollDown()
}
}
  