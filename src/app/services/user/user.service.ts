import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,

    ) { }

    url = environment.serverUrl;

    SignUp(datos:any){
        const send = this.http.post(`${this.url}users`,datos).toPromise()
        return send;
    }

    LogIn(datos:any){
        const send = this.http.post(`${this.url}login`,datos).toPromise()
        return send;
    }

    LogInAdmin(datos:any){
        const send = this.http.post(`${this.url}login`,datos).toPromise()
        return send;
    }

    SignUpDealer(datos:any){
        const send = this.http.post(`${this.url}dealers`,datos).toPromise()
        return send;
    }

    
    SignUpDealerShowRooms(datos:any){
        const send = this.http.post(`${this.url}dealer-show-rooms`,datos).toPromise()
        return send;
    }

    getUserById(user_id : any){
        const send = this.http.get(`${this.url}users/${user_id}`).toPromise()
        return send;
    }

    show(index: number) {
        return this.http.get(`${this.url}users/${index}`);
      }

      
    update(id: any, data: any,file :any): any {

        console.log('esto me  llego',id)

        console.log(file)

        console.log(data);
        
        var formData = new FormData;

        for(var d in data){
            console.log(d,'=>',data[d])
            formData.append(d,data[d] == null ? '' : data[d])
        }

        if(file != null){
            formData.append("logo_path",file)
        }

        return this.http.post(`${this.url}users/${id}`,formData);
    }

    getUsers(type =null ,date_from =null,date_to =null,status =null,offset=null,params?:string){

        var filter = ''
        
        if(type != null){
            filter += '&filters[type]='+type
        }
        
        if(date_from != null){
            filter += filter == '' ? '&dateStart='+date_from : '&dateStart='+date_from
        }

        if(date_to != null){
            filter += filter == '' ? '&dateEnd='+date_to : '&dateEnd='+date_to
        }
        
        
        if(status != null){
             filter += filter == '' ? '&filters[status]='+status : '&filters[status]='+status
        }

        if(params){
            
            filter += filter == '' ? '&page='+params : '&page='+params
        }

        const send = this.http.get(`${this.url}users?orderDirection=desc&orderBy=created_at${filter}`).toPromise()
        return send;
    }

    GetAdNextPageUrl(type =null ,date_from =null,date_to =null,status =null,page:any,per_page:any,filter_like:any): Promise<any> {
        
        var filter = ''
        
        if(type != null){
            filter += '&filters[type]='+type
        }
        
        if(date_from != null){
            filter += '&dateStart='+date_from 
        }

        if(date_to != null){
            filter +=  '&dateEnd='+date_to 
        }
        
        if(status != null){
             filter += '&filters[status]='+status 
        }

        if(filter_like != null){
            if(filter==''){
                filter += '&filter_like='+filter_like 
            }else{
                filter += '&filter_like='+filter_like 
            }
            
       }

/*         if(page != null){
            if(type==null){
                filter+='?page='+page 
            }else{
                filter += '&page='+page 
            }
            
       } */
       if(per_page != null){
        filter += '&per_page='+per_page 
   }

        const send = this.http.get(`${this.url}users?orderDirection=desc&orderBy=created_at${filter}`).toPromise()
        return send;
    }

    getNextPage(page:any, per_page:any, offset:any): Promise<any> {
        let next = '&page='+ page + '&per_page='+ per_page 
        const send = this.http.get(`${this.url}users?orderDirection=desc&orderBy=created_at${next}`).toPromise()
        return send;
    }

    setStatusUser(status:any,user_id:any){
        const send = this.http.post(`${this.url}users/${user_id}/status`,{status:status}).toPromise()
        return send;
    }

    conteo(id: number) {
        return this.http.get(`${this.url}users/${id}/info_ads`);
      }

    conteoProf(id: number) {
        return this.http.get(`${this.url}ads/byDealerCount/${id}`);
      }

           
    enviarInvitacion(data: string): any {

 

        return this.http.post(`${this.url}recovery-password-admin`,data );
    }
}
