import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) {}

  logout() {
    // Remove only authentication tokens or session data
    localStorage.removeItem('authToken'); // Example: remove auth token

    // Navigate to the login page or any other desired route
    this.router.navigate(['/login2']);
  }

 
}
