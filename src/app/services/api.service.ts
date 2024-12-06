import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://qualipharm-app.healthstrat.co.ke:4040/v1';

  constructor(public http: HttpClient) {}

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = { params: new HttpParams() };
    }
  
    if (params) {
      Object.keys(params).forEach(key => {
        reqOpts.params = reqOpts.params.set(key, params[key]);
      });
    }
  
    // Make the GET request
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
  
  

  post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.put(this.url + '/' + endpoint, body);
  }

  delete(endpoint: string, reqOpts?: any): Observable<any> {
    return this.http.delete(this.url + '/' + endpoint);
  }

  patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.patch(this.url + '/' + endpoint, body);
  }

  getFullUrl(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  postFullUrl(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.post(endpoint, body);
  }
}
