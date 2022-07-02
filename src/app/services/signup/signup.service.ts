import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    SignUp(datos:any){
        const send = this.http.post(`${this.url}users`,datos).toPromise()
        return send;
    }
        
}
