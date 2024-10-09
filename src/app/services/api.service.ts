import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://qualipharmapi.local/v1';

  constructor(public http: HttpClient) {}

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    // Create reqOpts if it does not exist
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    // Uncomment and implement authorization headers if needed
    // const token = this.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // reqOpts.headers = headers;

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
