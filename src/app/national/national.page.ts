import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-national',
  templateUrl: './national.page.html',
  styleUrls: ['./national.page.scss'],
})
export class NationalPage implements OnInit {

  constructor(private menuController:MenuController) { }

  toggleMenu() {
    this.menuController.toggle('menu'); 
  }

  ngOnInit() {
  }
  

}
