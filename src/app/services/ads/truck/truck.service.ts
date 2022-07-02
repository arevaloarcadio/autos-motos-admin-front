import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TruckService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(filtro:any): Promise<any> {

        const send = this.http.get(`${this.url}truck-ads?${filtro}`).toPromise()
        return send;
    }
}
