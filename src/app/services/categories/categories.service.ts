import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { BrandsWithGroupResponse } from '../../shared/interfaces/brands.interface';
import { ModelsResponse } from '../../shared/interfaces/models.interface';
import { GroupsResponse } from '../../shared/interfaces/groups.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getBrandsWithGroup(): Observable<BrandsWithGroupResponse> {
    return this.http.get<BrandsWithGroupResponse>(`${this.url}makes/get-grouped`);
  }

  getGroups(brandId: string): Observable<any> {
    if (!brandId) {
      return of(null);
    }
    return this.http.get<GroupsResponse>(`${this.url}makes/${brandId}/sub_models`);
  }

  createGroup(group: any): Observable<any> {
    return this.http.post<any>(`${ this.url }sub-models`, group )
    .pipe(
      map( resp => resp.ok ),
      catchError( err => of(err.error.message) )
    );
  }

}
