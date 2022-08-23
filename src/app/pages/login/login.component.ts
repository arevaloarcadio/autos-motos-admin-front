import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import user from 'src/app/services/user';
import jwtToken from 'src/app/services/jwt-token';
import * as $ from 'jquery'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,

    ) { }

    ngOnInit(): void {
    }

    loading:boolean=false;
    error:number=0;
    usuario:any={
        email:null,
        password:null
    }   
    show_password :boolean = false
    
    showPassword(){
        this.show_password = !this.show_password

        if(this.show_password){
            $('#password').attr("type","text")
        }else{
            $('#password').attr("type","password")
        }
    }

    LogIn(){
        if(Vacio(this.usuario)){
            this.error = 1;
            return
        }
        this.loading = true;
        this.UserService.LogInAdmin(this.usuario).then((res :any)=>{
            
            user.setUser(res.user)
            jwtToken.setToken(res.token)

            this.loading = false;
            this.router.navigate(['admin'])
        }).catch(err=>{
            console.log(err)
            if(err.error.error=='invalid_credentials'){
                this.error=2;
            }
            this.loading = false;

        });
    }

}
