import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent  implements OnInit {

  notifications: Notification[] = [];
 

  constructor(private notificationService: NotificationService, private location:Location) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
      this.markAllAsRead();
    });
  }
  
  goBack() {
    this.location.back();
  }
  
  private markAllAsRead(): void {
    this.notifications.forEach(notification => notification.isNew = false);
  }
}