import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImportMassive } from 'src/app/services/import-massive/import-massive.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import Pusher from 'pusher-js'
import * as $ from 'jquery';
import user from 'src/app/services/user';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-massive-import-upload-file',
    templateUrl: './massive-import-upload-file.component.html',
    styleUrls: ['./massive-import-upload-file.component.scss'],
})

export class MassiveImportUploadFileComponent implements OnInit {
  constructor(
      private ImportMassive:ImportMassive,
      private router: Router,
      public dialog: MatDialog
  ){}

  pusher:any = null;
  user :any = user.getUser()
  
  ngOnInit(): void {
     
  }

 

  ngAfterViewInit(){

    this.pusher = new Pusher('81b7e6f0b977f9c79c36', {
      cluster: 'eu'
    });

    var channel = this.pusher.subscribe('percentage');
    var self = this
    
    channel.bind(`percentage-`+this.user.id, function(data :any) {
      console.log(data)
      self.percentage = data.percentage
    });
  
  }

  redirect(path :any){
    this.router.navigate([path])
  }

  day = new Date().getDate()
  year = new Date().getFullYear()
  formData = new FormData();
  upload = false
  percentage = '0%'

  selectFile(){
    $("#upload-file").trigger("click");
  }

  downloadCSV(){
    $("#download-csv").trigger("click");
  }

  uploadFile($event :any){
    this.upload = true
    this.formData.append("file",$event.target.files[0]) 
    
    this.ImportMassive.UploadFileImportMassive(this.formData).then(res=>{
          this.upload = false

          console.log(res)

          this.dialog.open(AlertMessageComponent, {
            data :  {message : 'Tu publicación masiva se ha creado con éxito', error : null , success : true}  ,
          });
            //this.loading = false;
            //this.router.navigate(['admin'])
        }).catch(err=>{
          this.upload = false
          console.log(err)
           this.dialog.open(AlertMessageComponent, {
            data :  {message : 'No se ha podido cargar correctamente tu publicación masiva. Asegurate de haberla completado correctamente o vuelve a intentarlo más tarde.', error : true , success : null}  ,
          });
           // console.log(err.error.error)
            /*if(err.error.error=='invalid_credentials'){
                this.error=2;
            }
            this.loading = false;*/

        });
  }
}


  0