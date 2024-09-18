import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private menuController:MenuController
  ) { }

  ngOnInit() {}

   navigateToProfile() {
    console.log('Navigating to profile...');
    this.router.navigate(['/profile']).then(() => {
      console.log('Navigation to profile successful');
      this.menuController.close('menu');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  
  logout() {
    console.log('Logging out...');
    this.logoutService.logout();
    this.router.navigate(['/login2']).then(() => {
      console.log('Navigation to login2 successful');
      this.menuController.close('menu');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  changePassword(){
    this.router.navigate(['change-password']).then(() => {
      this.menuController.close('menu')
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  
}
