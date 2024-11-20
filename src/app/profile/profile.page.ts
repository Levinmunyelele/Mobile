import { Component, OnInit, Renderer2 } from '@angular/core';
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

  darkMode: boolean = false; // Default to light mode
  userName: string = '';
  userEmail: string = '';
  userImage: string | undefined;

  constructor(private router: Router, private renderer: Renderer2, private location: Location) { }

  ngOnInit() {
    this.loadUserData();
    this.checkAndApplyTheme(); // Check for saved theme preference
  }

  // Toggle dark mode when the user clicks the button
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.saveThemePreference(); // Save the user's preference
    this.applyTheme();
  }

  // Apply dark or light mode depending on the current theme
  private applyTheme() {
    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }

  // Enable dark mode styles
  private enableDarkMode() {
    this.renderer.setStyle(document.body, '--ion-background-color', '#333333');
    this.renderer.setStyle(document.body, '--ion-text-color', '#ffffff');
    document.body.classList.add('dark-theme'); // Add dark theme class (optional, for additional customization)
  }

  // Enable light mode styles
  private enableLightMode() {
    this.renderer.setStyle(document.body, '--ion-background-color', '#ffffff');
    this.renderer.setStyle(document.body, '--ion-text-color', '#000000');
    document.body.classList.remove('dark-theme'); // Remove dark theme class
  }

  // Save the user's theme preference to sessionStorage or localStorage
  private saveThemePreference() {
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode)); // Use localStorage to persist preference across sessions
  }

  // Check and apply the stored theme preference when the app loads
  private checkAndApplyTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.darkMode = JSON.parse(savedTheme);
    }
    this.applyTheme(); // Apply the theme based on the stored preference
  }

  // Load user data from sessionStorage (or another source)
  loadUserData() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = `${user.firstName} ${user.lastName}`;
    this.userEmail = user.email;
  }

  // Go back to the previous page
  goBack(): void {
    this.location.back();
  }

  // Share app functionality
  async shareApp() {
    await Share.share({
      title: 'App Sharing',
      text: 'Check out this awesome app!',
      url: 'https://qualipharm-app.healthstrat.co.ke',
    });
  }

  // Capture photo functionality (using Capacitor Camera)
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    this.userImage = image.webPath;
  }

  // Check camera permissions (optional)
  async checkPermissions() {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted') {
      await Camera.requestPermissions();
    }
  }
}
