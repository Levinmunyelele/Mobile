// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(mobile: string, password: string) {
    return this.http.get<any>('http://qualipharmapi.local/v1/users', {
      params: {
        mobile: mobile,
        password: password
      }
    });
  }
}
