import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getMarcas() {
    return this.http.get(`${this.url}api/makes?orderBy=name&orderDirection=asc&per_page=500`);
  }

  getModelos() {
    return this.http.get(`${this.url}api/makes/{make_id}/sub_models`);
  }



}
