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

    let numericMobile = this.mobile.replace(/\D/g, '');

    const formData = {
      mobile: numericMobile,
      password: this.password
    };
    console.log(formData)
    this.http.post<any>('https://qualipharm-app.healthstrat.co.ke/api/v1/auth/login', formData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        if (response) {
          const { data, token } = response;
          localStorage.setItem("mobile", numericMobile)
          const { userGroupName } = data;
          localStorage.setItem('token', token);

          switch (userGroupName) {
            case 'National':
              this.router.navigate(['./national']);
              break;
            case 'Facility':
              this.router.navigate(['./facilities']);
              break;
            case 'Sub County':
              this.router.navigate(['./sub-counties']);
              break;
              break;
              case 'County':
                this.router.navigate(['counties']);
                break;
            case 'Admin':
              this.router.navigate(['./dashboard']);
              break;
            default:
              break;
          }
        }
      },
      (error) => {
        console.error('Login error:', error);
        if (error.status === 400) {
          this.errorMessage = 'Incorrect phone number or password.';
        } else {
          this.errorMessage = 'An error occurred while logging in. Please try again laters.';
        }
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    this.changetype = !this.changetype
  }
}