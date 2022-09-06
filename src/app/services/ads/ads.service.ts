import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    GetAdIndividual(type:any = null,date:any = null,sort:any = null): Observable<any> {

        let headers = {
            'Content-Type': 'application/json'
        };

        var filter = ''
        
        if(type != null){
            filter += '?filters[type]='+type
        }
        
        if(date != null){
            filter += filter == '' ? '?filters[created_at]='+date : '&filters[created_at]='+date
        }
        
        if(sort != null){
             filter += filter == '' ? '?filters[status]='+sort : '&filters[status]='+sort
        }
        return this.http.get<any[]>(`${this.url}ads${filter}`,{headers});
        // const send = this.http.get(`${this.url}ads${filter}`).toPromise()
        // return send;
    }

 
 


    // GetAdNextPageUrl(next_url:any,type:any = null,date:any = null,sort:any = null): Promise<any> {
    //     var filter = ''
        
    //     if(type != null){
    //         filter += '&filters[type]='+type
    //     }
        
    //     if(date != null){
    //         filter +=  '&filters[created_at]='+date
    //     }
        
    //     if(sort != null){
    //          filter += '&filters[status]='+sort
    //     }

    //     const send = this.http.get(`${next_url}${filter}`).toPromise()
    //     return send;
    // }


    GetAdNextPageUrl(type =null ,date:any = null,sort:any = null,page:any,per_page:any,filter_like:any): Promise<any> {
        
        var filter = ''
        
        if(type != null){
            filter += '?filters[type]='+type
        }
        
        if(date != null){
            filter +=  '&filters[created_at]='+date
        }
        
        if(sort != null){
            filter += '&filters[status]='+sort
       }

       if(filter_like != null){
            if(filter==''){
                filter += '?filter_like='+filter_like 
            }else{
                filter += '&filter_like='+filter_like 
            }
            
        }

       if(page != null){
        if(type==null){
            filter+='?page='+page 
        }else{
            filter += '&page='+page 
        }
        
   }
       if(per_page != null){
        filter += '&per_page='+per_page 
   }

        const send = this.http.get(`${this.url}ads${filter}`).toPromise()
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

    GetGroupByCsv(type:any = null,date:any = null,sort:any = null,page:any,per_page:any,filter_like:any): Promise<any> {
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

        if(filter_like != null){
            if(filter==''){
                filter += '/?filter_like='+filter_like 
            }else{
                filter += '&filter_like='+filter_like 
            }
            
        }

        if(page != null){
            filter += filter == '' ? '?page='+page :'&page='+page
       }
            if(per_page != null){
                filter += filter == '' ? '?per_page='+per_page  : '&per_page='+per_page 
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

    acceptRejectAds(status:any,ad_ids:any[]): Promise<any> {
        const send = this.http.post(`${this.url}ads/${status}/approved_rejected`, {ad_ids : ad_ids, status : status}).toPromise()
        return send;
    }

    commentRejectAd(data:any) {
        // const send = this.http.post(`${this.url}ads/${ad_id}/rejected_comment`, {comment : comment}).toPromise()
        return this.http.post(`${this.url}ads/rejected_comment_individual_ads`,data );
        // return send;
    }

    // update(data: any, id: any): any {

    //     return this.http.post(`${this.url}users/${id}`,data );
    // }

    commentRejectAds(csv_ad_id:any,comment:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/${csv_ad_id}/ads_rejected_comment`, {comment : comment}).toPromise()
        return send;
    }

    commentRejectAdsIndividual(ad_ids:any,comment:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/rejected_comment_individual_ads`, {comment : comment, ad_ids:ad_ids}).toPromise()
        return send;
    }
}
