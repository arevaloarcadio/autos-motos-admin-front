import { Component,Inject } from '@angular/core';
import { Router} from '@angular/router';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'alert-message',
  templateUrl: 'alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})

export class AlertMessageComponent {
	
  constructor(
   	private router: Router,
  	@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlertMessageComponent>) {
  }
  csv_ad_id :any =null
  user_id :any =null
  ad_id :any =null
  ad_ids :any =null
  ad_length :any =null
  ad_individual  :any =null

  ngOnInit(): void {

    console.log('anuncios rechazados',this.data.anuncios)
    
    if(this.data.csv_ad_id){
      this.csv_ad_id = this.data.csv_ad_id
    }
    
    if(this.data.user_id){
      this.user_id = this.data.user_id
    }
    
    if(this.data.ad_id){
      this.ad_id = this.data.ad_id
    }
    
    if(this.data.ad_length){
      this.ad_length = this.data.ad_length
    }

    if(this.data.ad_ids){
      this.ad_ids = this.data.ad_ids
    }

    if(this.data.ad_individual){
      this.ad_individual = this.data.ad_individual
    }
  }  
  
  closeDialog() {
    this.dialogRef.close();
  }

  comment() {
    this.dialogRef.close();
    var csv_ad_id : any= this.csv_ad_id
    var user_id : any = this.user_id

    if(this.ad_individual){
      if(this.ad_id){
        this.router.navigate(['admin/comments-rejected-individual/'+user_id],{queryParams: {ad_id: this.ad_id}})
      }else{
        var ad_string_ids = ''
        this.ad_ids.forEach((row:any,key:any)=>{
          if(this.ad_ids.length == key){
            ad_string_ids += row.id
          }else{
            ad_string_ids += row.id+'|'
          }
        })

        this.router.navigate(['admin/comments-rejected-individual/'+user_id],{queryParams: {ad_length: this.ad_length,ad_string_ids:ad_string_ids}})
      }
      return
    }
    
    if(this.ad_id){
      console.log('entramos en el primero')
        this.router.navigate(['admin/comments-rejected/'+csv_ad_id+'/'+user_id],{queryParams: {data:this.data.anuncios}})
    }else{
      console.log('entramos en el segundo')
       this.router.navigate(['admin/comments-rejected/'+csv_ad_id+'/'+user_id],{queryParams: {data:this.data.anuncios}})
    }
  

  }
	handlerDownload(){

		var self : any = this;
		setTimeout(() => {
	  		self.router.navigate(['/admin/products-massive-import-upload-file'])
		}, 3000);
	}
}