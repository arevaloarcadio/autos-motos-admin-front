import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdsService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(): Promise<any> {
        const send = this.http.get(`${this.url}ads`).toPromise()
        return send;
    }

    GetUltimos(): Promise<any> {
        const send = this.http.get(`${this.url}ads?orderBy=id&orderDirection=desc&per_page=15`).toPromise()
        return send;
    }

    

    GetById(id:string): Promise<any> {
        const send = this.http.get(`${this.url}ads?filters[id]=${id}`).toPromise()
        return send;
    }

    GetBySource(): Promise<any> {
        const send = this.http.get(`${this.url}ads/bySource`).toPromise()
        return send;
    }
    GetBySourceDate(dateStart : any = null,dateEnd:any= null ): Promise<any> {
        const send = this.http.get(`${this.url}ads/bySource?dateStart=${dateStart}&dateEnd=${dateEnd}`).toPromise()
        return send;
    }

    GetByCsv(csv_ad_id:any): Promise<any> {
        const send = this.http.get(`${this.url}ads/byCsv/${csv_ad_id}`).toPromise()
        return send;
    }

    GetGroupByCsv(type:any = null,date:any = null,sort:any = null): Promise<any> {
        var filter = ''
        
        if(type != null){
            filter += '/?type='+type
        }
        
        if(date != null){
            filter += filter == '' ? '/?date='+date : '&date='+date
        }
        
        if(sort != null){
             filter += filter == '' ? '/?sort='+sort : '&sort='+sort
        }

        const send = this.http.get(`${this.url}ads/groupByCsv${filter}`).toPromise()
        return send;
    }

    getAdById(ad_id:any): Promise<any> {
        const send = this.http.get(`${this.url}ads/${ad_id}`).toPromise()
        return send;
    }

    countAdsToday(): Promise<any> {
        const send = this.http.get(`${this.url}ads/countToday`).toPromise()
        return send;
    }

    countImportToday(): Promise<any> {
        const send = this.http.get(`${this.url}ads/countImportToday`).toPromise()
        return send;
    }

    acceptRejectAd(status:any,user_id:any,ad_ids:any[]): Promise<any> {
        const send = this.http.post(`${this.url}ads/${status}/approved_rejected`, {ad_ids : ad_ids, user_id : user_id}).toPromise()
        return send;
    }

    commentRejectAd(ad_id:any,comment:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/${ad_id}/rejected_comment`, {comment : comment}).toPromise()
        return send;
    }

     commentRejectAds(csv_ad_id:any,comment:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/${csv_ad_id}/ads_rejected_comment`, {comment : comment}).toPromise()
        return send;
    }
}
