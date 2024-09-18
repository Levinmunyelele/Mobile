import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service'


@Component({
  selector: 'app-stock-reports',
  templateUrl: './stock-reports.page.html',
  styleUrls: ['./stock-reports.page.scss'],
})
export class StockReportsPage implements OnInit {
  currentDate: Date = new Date();

  newNotificationsCount: number = 0;

  goBack(): void {
    this.location.back();
  }

  constructor(private router: Router, private location: Location, private menuController: MenuController ,private notificationService: NotificationService) { }


  ngOnInit() {
    this.loadNotifications();
  }

  toggleMenu() {
    this.menuController.toggle('menu');

  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']); 
  }

  printPage() {
    window.print();
  }
}
