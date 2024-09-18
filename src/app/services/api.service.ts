import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
  
    url = 'http://qualipharmapi.local/v1';
    // reportUrl = 'https://dqa.nascop.org';
  
    constructor(public http: HttpClient) { }
  
    // private getToken(): string | null {
    //   return sessionStorage.getItem('11M8jE5vffG_qAUmIAw5Kfx0ULsjWyyttJC3j7'); 
    // }
  
    get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }
      // Support easy query params for GET requests
      if (params) {
        reqOpts.params = new HttpParams();
        for (const k in params) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params[k]);
          }
        }
      }
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(this.url + '/' + endpoint, { params });
    }
  
    post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(this.url + '/' + endpoint, body);
    }
  
    put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put(this.url + '/' + endpoint, body);
    }
  
    delete(endpoint: string, reqOpts?: any): Observable<any> {
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(this.url + '/' + endpoint);
    }
  
    patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.patch(this.url + '/' + endpoint, body);
    }
  
    getFullUrl(endpoint: string): Observable<any> {
      return this.http.get(endpoint);
    }
  
    postFullUrl(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    //   const token = this.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(endpoint, body);
    }
  }
  