import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-counties',
  templateUrl: './counties.page.html',
  styleUrls: ['./counties.page.scss'],
})
export class CountiesPage implements OnInit {

  constructor(private menuController:MenuController, private router:Router) { }

  ngOnInit() {
  }
  toggleMenu() {
    this.menuController.toggle('menu'); // Toggle the menu with menuId 'menu'
  }

  navigateToProfile() {
    this.router.navigate(['/profile']); // Adjust route as per your routing configuration
    this.menuController.close('menu'); // Close the menu after action
  }

  logout() {
    // Implement logout logic, e.g., clear session, local storage, etc.
    // Example:
    // localStorage.removeItem('token'); // Clear token from localStorage
    // this.authService.logout(); // Call your logout service if applicable
    this.router.navigate(['/login2']); // Navigate to login page after logout
    this.menuController.close('menu'); // Close the menu after action
  }


}
