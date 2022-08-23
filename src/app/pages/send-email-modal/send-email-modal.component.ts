import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss']
})
export class SendEmailModalComponent implements OnInit {
  formD: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private AdsService:AdsService,
    private userService: UserService,
    private router: Router,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SendEmailModalComponent>

  ){
    this.formD = this.fb.group({
      id: [''],
      email: [''],

    });

  }

  ngOnInit(): void {
  console.log(this.data)
  console.log(this.data.id)
  this.formD.controls.id.setValue(this.data.id)
  }

  enviar(){

    this.userService.enviarInvitacion(this.formD.value).subscribe(
      (data: any) => {
          // this.loading = false;
          console.log('entramos')
          this.closeDialog()
         
       this.toast.success("enviado correctamente");
          // this.router.navigate(["/admin/users"]);
      }
    );

  }

  redirect(path :any){
    this.router.navigate([path])
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}