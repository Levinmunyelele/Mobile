import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './../services/notification.service'
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-nationalhome',
  templateUrl: './nationalhome.page.html',
  styleUrls: ['./nationalhome.page.scss'],
})
export class NationalhomePage implements OnInit {
  selectedMonth: string;
  selectedYear: string;
  months: string[];
  years: number[];
  newNotificationsCount: number = 0;




  constructor(private notificationService:NotificationService,private menuController:MenuController, private router:Router) {
    this.selectedMonth = 'July';
    this.selectedYear = '2024';
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
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
  }

  regions = [
    {
      name: 'Lamu West',
      items: [
        { name: 'Family Planning', percentage: 37, color: 'primary' },
        { name: 'Malaria', percentage: 85, color: 'medium' },
        { name: 'TB', percentage: 37, color: 'tertiary' },
        { name: 'MOH 647 Facility Tracer Health.', percentage: 56, color: 'secondary' },
      ]
    },
    {
      name: 'Lamu East',
      items: [
        { name: 'Family Planning', percentage: 93, color: 'primary' },
        { name: 'Malaria', percentage: 6, color: 'medium' },
        { name: 'TB', percentage: 23, color: 'tertiary' },
        { name: 'MOH 647 Facility Tracer Health.', percentage: 46, color: 'secondary' },
      ]
    }
  ];

  getProgressBarColor(percentage: number): string {
    if (percentage >= 75) {
      return 'success';
    } else if (percentage >= 50) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}