import { Component, OnInit,  Renderer2 } from '@angular/core';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  darkMode: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userImage: string | undefined;

  goBack(): void {
    this.location.back(); 
  }

  async shareApp() {
    await Share.share({
      title: 'App Sharing',
      text: 'Check out this awesome app!',
      url: 'https://qualipharm-app.healthstrat.co.ke',
    });
  }
  constructor(private router: Router, private renderer: Renderer2,private location: Location ){ }
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
    this.loadUserData();

  }
  loadUserData() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = `${user.firstName} ${user.lastName}`;
    this.userEmail = user.email;
  }
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera 
    });
  
    this.userImage = image.webPath;
  }
  async checkPermissions() {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted') {
      await Camera.requestPermissions();
    }
  }
}
