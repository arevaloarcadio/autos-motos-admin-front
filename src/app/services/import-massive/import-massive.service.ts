import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtToken from 'src/app/services/jwt-token';

@Injectable({
    providedIn: 'root'
})
export class ImportMassive {

    constructor(
        private http: HttpClient,
    ) { }

    options:any =  {
    	headers: { 
    		'Authorization' : 'Bearer '+jwtToken.getToken()
    	}
    } 
   

    url = environment.serverUrl;

    UploadFileImportMassive(data :any): Promise<any> {
        const send = this.http.post(`${this.url}import/massive`,data,this.options).toPromise()
        return send;
    }

}

