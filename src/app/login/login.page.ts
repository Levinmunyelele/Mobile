import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  mobile: string = ''; // Ensure phone and password are initialized to empty strings
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  onLogin() {
    if (!this.mobile || !this.password) {
      console.error('Phone number and password are required.');
      // Display error message to user
      return; // Exit the function early if phone or password is missing
    }

    this.loginService.login(this.mobile, this.password).subscribe(
      (res: any) => {
        // Check if the response contains access and refresh tokens
        if (res.accessToken && res.refreshToken) {
          // Handle successful login
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.router.navigateByUrl('/profile');
        } else {
          console.error('Access token or refresh token missing in response.');
          // Display error message to user
        }
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
        // Display error message to user
      }
    );
  }
}
