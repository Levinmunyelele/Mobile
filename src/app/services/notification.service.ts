import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Notification {
  messageId: number;
  subject: string;
  message: string;
  createdTime: Date;
  isNew: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private api: ApiService) { }

  getNotifications(): Observable<Notification[]> {
    return this.api.get('messages').pipe(
      map((response: any) => { 
        const notifications: Notification[] = response; 
        return notifications.map(notification => {
          notification.isNew = this.checkIfNew(notification);
          return notification;
        });
      })
    );
  }

  private checkIfNew(notification: Notification): boolean {
    const now = new Date();
    const createdTime = new Date(notification.createdTime);
    const diffInHours = (now.getTime() - createdTime.getTime()) / (1000 * 3600);
    return diffInHours < 24; 
  }
}
