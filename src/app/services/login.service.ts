import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient, 
    private api:ApiService
  ) { }

  changePassword(payload:any){
    return this.api.post("auth/change-password",payload);
  }

  login(payload:any) {

    return this.api.post("login/login",payload);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); 
  }
}

