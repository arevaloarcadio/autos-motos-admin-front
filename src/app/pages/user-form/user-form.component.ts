import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formD: FormGroup | any;
  datosUsuario:any
  toEdit$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor( 
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router:Router
    ) {
    this.file = null
    this.formD = this.fb.group({
      id: [''],
      first_name: [''],
      email:[''],
      city:[''],
      whatsapp_number:[''],
      mobile_number:[''],
      country:[''],
      address:[''],
      //dealer - Vendedor Profesional
      company_name:[''],
      vat_number:[''],
      email_address:[''],
      dealer_city:[''],
      zip_code:[''],
      phone_number:[''],
      country_dealer:[''],
      description:[''],
      dealer_address:[''],
    });


    this.activatedRoute.params
    .pipe(
      switchMap(params => {
        if (params['user_id']) {
          return this.userService.show(params['user_id']);
        } else {
          return of(null);
        }
      })
    )
    .subscribe(data => {
      if (data) {
        this.datosUsuario=JSON.parse(JSON.stringify(data)).data
        this.toEdit$.next(JSON.parse(JSON.stringify(data)).data);
        this.formD.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id']);
        this.formD.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data['first_name']);
        this.formD.controls['email'].setValue(JSON.parse(JSON.stringify(data)).data['email']);
        this.formD.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data['whatsapp_number']);
        this.formD.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data['mobile_number']);
        
        this.formD.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['city']);
        this.formD.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['country']);
        this.formD.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['address']);
        this.formD.controls['company_name'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['company_name']);
        this.formD.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['email_address']);
        this.formD.controls['vat_number'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['vat_number']);
        this.formD.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['zip_code']);
        this.formD.controls['phone_number'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['phone_number']);
        this.formD.controls['description'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['description']);
        this.formD.controls['dealer_address'].setValue(JSON.parse(JSON.stringify(data)).data['dealer']['address']);
        
        // this.formD.controls['descripcion'].setValue(data['descripcion']);
        // this.formD.controls['precio'].setValue(data['precio']);

        // if(data['videos'].length > 0){
        //   this.videos = data['videos']
        // }

        console.log('este es el usuario',data)
      }
    })

   }
  file: any
  ngOnInit(): void {
  }

  getFile(ev :any){
    this.file = ev.target.files[0]
    console.log(this.file)
    var reader:any = new FileReader();
    reader.onload = function(){
      var logo_path = $('#logo_path');
      logo_path.attr("src",reader.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
    
  }

  showFile(){
    $('#file').click()
  }


  save(){
    
    let id =this.formD.controls.id.value
    console.log('esto va',JSON.stringify(id))

    this.userService.update(id, this.formD.value,this.file).subscribe(
      (data: any) => {
          // this.loading = false;
          // this.toastr.success(data.message, "Ha salido bien!");
          this.router.navigate(["/admin/users"]);
      }
  );

  }


}
