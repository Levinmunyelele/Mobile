import { Component, OnInit } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// const { Share } = Plugins;
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  async shareApp() {
    await Share.share({
      title: 'App Sharing',
      text: 'Check out this awesome app!',
      url: 'https://example.com',
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
