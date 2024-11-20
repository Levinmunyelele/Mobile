import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {

  mobile: string = '';
  password: string = '';
  errorMessage: string | undefined;
  hidePassword: boolean = true;
  changetype: boolean = true;
  rememberMe: boolean = false;

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) { }

  readonly phoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  }
  readonly maskPredicate: MaskitoElementPredicate = async (el: HTMLElement) => (el as HTMLIonInputElement).getInputElement();

  customCounterFormatter(inputLength: number, maxLength: number) {

    return `${maxLength - inputLength} characters remaining`;

  }
  ngOnInit() {
    this.loadCredentials();
  }

  loadCredentials() {
    if (localStorage.getItem('rememberMe') === 'true') {
      this.mobile = localStorage.getItem('mobile') || '';
      this.rememberMe = true;
    }
  }

  saveCredentials() {
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('mobile', this.mobile);
    } else {
      localStorage.setItem('rememberMe', 'false');
      localStorage.removeItem('mobile');
    }
  }
  login() {
    this.errorMessage = '';

    const mobile = this.mobile.replace(/\D/g, ''); 
  
    if (mobile.length !== 10) {
      this.errorMessage = 'Please enter a valid 10-digit mobile number.';
      return;
    }
  
    this.loginService.login({ mobile, password: this.password }).subscribe({
      next: (response: any) => {
        console.log('Response received:', response);  
  
        if (response && response.token) {
          const { data, token } = response;

          this.errorMessage = '';
  
          sessionStorage.setItem('mobile', mobile);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(data));

          this.mobile = ''; 
          this.password = ''; 
  
          switch (data.userType) {
            case 'National':
              this.router.navigate(['./national']);
              break;
            case 'Facility User':
              this.router.navigate(['./facilities']);
              break;
            case 'Sub County Approvers':
              this.router.navigate(['./sub-counties']);
              break;
            case 'County Approvers':
              this.router.navigate(['./counties']);
              break;
            case 'Administrators':
              this.router.navigate(['./dashboard']);
              break;
            default:
              this.errorMessage = 'Unknown user type. Please try again.';
              break;
          }
        }
      },
      error: (error) => {
        console.error('Error received:', error);
        this.errorMessage = error?.error?.message || 'Invalid Mobile or Password. Please try again later.';
      }
    });
  }
   
  

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    this.changetype = !this.changetype
  }
}
