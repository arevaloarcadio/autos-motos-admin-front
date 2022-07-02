import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VehiculosService {

    constructor(
        private http: HttpClient,

    ) { }

    url = environment.serverUrl;

    GetAutos(){
        
        const send = this.http.get(`${this.url}auto-ads?page=1`).toPromise()
        return send;
    }
}
