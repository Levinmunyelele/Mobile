import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  mobile = sessionStorage.getItem("mobile") ?? '';
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  error!: string;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back()
  }

  changePassword() {
    const payload = {
      mobile: this.mobile,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.loginService.changePassword(payload)
      .subscribe(
        response => {
          console.log(response);
          this.showSuccessMessage = true;
        },
        error => {
          console.error(error);
          this.showErrorMessage = true;
          this.error = error.message;
        }
      );
      this.router.navigate(['/profile']);
  }
}  
