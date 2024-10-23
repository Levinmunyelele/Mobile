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
    this.menuController.toggle('menu'); 
  }

  navigateToProfile() {
    this.router.navigate(['/profile']); 
    this.menuController.close('menu'); 
  }

  logout() {
    
    this.router.navigate(['/login2']); 
    this.menuController.close('menu'); 
  }


}
