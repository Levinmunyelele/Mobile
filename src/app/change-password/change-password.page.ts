import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  mobile = localStorage.getItem("mobile")?? '';;
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  error!: string;
  showSuccessMessage: boolean = false; // Add showSuccessMessage property
  showErrorMessage: boolean = false;   // Add showErrorMessage property

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  changePassword() {
    // Call the changePassword method from your LoginService
    this.loginService.changePassword(this.mobile, this.oldPassword, this.newPassword, this.confirmPassword)
      .subscribe(
        response => {
          // Handle successful password change
          console.log(response);
          this.showSuccessMessage = true; // Show success message
          // Optionally, navigate to another page or display a success message
        },
        error => {
          // Handle error
          console.error(error);
          this.showErrorMessage = true; // Show error message
          this.error = error.message; // Set error message to display in the template
        }
      );
  }
}
