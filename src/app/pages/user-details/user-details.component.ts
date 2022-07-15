import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  datosUsuario:any
  toEdit$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor( private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router:Router) {
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
        // this.formD.controls['descripcion'].setValue(data['descripcion']);
        // this.formD.controls['precio'].setValue(data['precio']);

        // if(data['videos'].length > 0){
        //   this.videos = data['videos']
        // }

        console.log('este es el usuario',data)
      }
    })

     }

  ngOnInit(): void {
  }

}
