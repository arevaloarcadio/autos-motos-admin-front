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
    ad_length :any =null

  ngOnInit(): void {
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
  }  
  
  closeDialog() {
    this.dialogRef.close();
  }

  comment() {
    this.dialogRef.close();
    var csv_ad_id : any= this.csv_ad_id
    var user_id : any = this.user_id
    if(this.ad_id){
        this.router.navigate(['admin/comments-rejected/'+csv_ad_id+'/'+user_id],{queryParams: {ad_id: this.ad_id}})
    }else{
       this.router.navigate(['admin/comments-rejected/'+csv_ad_id+'/'+user_id],{queryParams: {ad_length: this.ad_length}})
    }
  

  }
	handlerDownload(){

		var self : any = this;
		setTimeout(() => {
	  		self.router.navigate(['/admin/products-massive-import-upload-file'])
		}, 3000);
	}
}