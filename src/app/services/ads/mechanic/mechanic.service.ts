import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MechanicService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(): Promise<any> {

        const send = this.http.get(`${this.url}ads?filters[type]=mechanic`).toPromise()
        return send;
    }
}
