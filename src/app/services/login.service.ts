import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // login(mobile: string, password: string) {
  //   return this.http.post<any>('http://192.168.1.170:4040/v1/auth/login', {
  //     mobile: mobile,
  //     password: password
  //   });
  // }

  changePassword(mobile: string, oldPassword: string, newPassword: string, confirmPassword: string) {
console.log("old pass:" + oldPassword);
console.log("new pass:" + newPassword);
console.log("confirm pass:" + confirmPassword);
console.log("mobile:" + mobile);
console.log('test')
    return this.http.post<any>('https://qualipharm-app.healthstrat.co.ke/api/v1/auth/change-password', {
      mobile: mobile,
      confirmPassword: confirmPassword,
      newPassword: newPassword,
      oldPassword: oldPassword,
    });
  }
}
