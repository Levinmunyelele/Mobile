import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationService, Notification } from './../services/notification.service'


@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {      

  selectedRegion: string | undefined;
  selectedMonth: string | undefined;
  selectedYear: number | undefined;
  newNotificationsCount: number = 0;
  county: string = '';
  

  regions: string[] = ['Lamu'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2024, 2023, 2022];

  reportData: any[] = [
    {
      name: 'Lamu West',
      items: [
        { programme: 'Family Planning', rate: 7.41 },
        { programme: 'Malaria', rate: 3.7 },
        { programme: 'TB', rate: 3.7 },
        { programme: 'HIV 2019 Form', rate: 3.7 },
        { programme: 'Oxygen', rate: 7.41 },
        { programme: 'MOH 647 Facility Tracer Health Products and Technology (HPT) Data Report Form', rate: 6.48 }
      ]
    },
    {
      name: 'Lamu East',
      items: [
        { programme: 'Family Planning', rate: 41.67 },
        { programme: 'Malaria', rate: 41.67 },
        { programme: 'TB', rate: 16.67 },
        { programme: 'HIV 2019 Form', rate: 22.92 },
        { programme: 'Oxygen', rate: 16.67 },
        { programme: 'MOH 647 Facility Tracer Health Products and Technology (HPT) Data Report Form', rate: 33.33 }
      ]
    }
  ];
  constructor(private menuController:MenuController, private router:Router, private notificationService: NotificationService) { }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.county) {
      this.county = user.county;  
    } else {
      console.warn('User or subcounty information not found.');
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']); 
  }
  toggleMenu() {
    this.menuController.toggle('menu'); 
  }

  ngOnInit() {
    this.loadUserDetails();
    this.selectedRegion = this.regions[0];
    this.selectedMonth = this.months[5]; 
    this.selectedYear = this.years[0]; 
    this.loadNotifications();
  }


}
  
  

