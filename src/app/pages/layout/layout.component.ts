import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';
import user from 'src/app/services/user';
import jwtToken from 'src/app/services/jwt-token';



//import { INavData }  from '@coreui/angular';
import '../../../assets/script/coreui.bundle.min.js'
import '../../../assets/script/coreui-utils.js'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,

    ) { }

  ngOnInit(): void {
  }   

  user =  user.getUser()
  route = this.router
  
  logout(){
    user.removeUser()
    jwtToken.removeToken()
    this.redirect('/login')
  }

  redirect(path :any){
    this.router.navigate([path])
  }

}
  