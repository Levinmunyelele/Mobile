import { Component, OnInit,  Renderer2 } from '@angular/core';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  darkMode: boolean = false;

  goBack() {
    this.router.navigate(['/dashboard']);
  }


  async shareApp() {
    await Share.share({
      title: 'App Sharing',
      text: 'Check out this awesome app!',
      url: 'https://example.com',
    });
  }
  constructor(private router: Router, private renderer: Renderer2) { }
  toggleDarkMode() {
    this.darkMode ? this.enableDarkMode() : this.enableLightMode();
  }

  private enableDarkMode() {
    this.renderer.setStyle(document.body, '--ion-background-color', '#333333');
  }

  private enableLightMode() {
    this.renderer.setStyle(document.body, '--ion-background-color', '#ffffff'); 
  }

  ngOnInit() {
  }

}
