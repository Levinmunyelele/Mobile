import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

// import './app.component.scss';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menuController: MenuController,private router:Router) {}

}
