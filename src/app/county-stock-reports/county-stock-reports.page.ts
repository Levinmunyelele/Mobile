import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service';

@Component({
  selector: 'app-county-stock-reports',
  templateUrl: './county-stock-reports.page.html',
  styleUrls: ['./county-stock-reports.page.scss'],
})
export class CountyStockReportsPage implements OnInit {


  currentDate: Date = new Date();
  programmes!: any[];
  newNotificationsCount: number = 0;
  userCounty: any;

  constructor(private router: Router, private location: Location, private menuController: MenuController, private notificationService: NotificationService, private inventoryService: InventoryService) { }


  ngOnInit() {
    this.loadUserDetails();
    this.loadNotifications();
    this.loadProgrammes()

  }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.county) {
      this.userCounty = user.county;
      console.log('User County:', this.userCounty);
    } else {
      console.warn('User or county information not found.');
    }
  }

  toggleMenu() {
    this.menuController.toggle('menu');

  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  loadProgrammes() {
    this.inventoryService.getProgrammes().subscribe(
      (data: any) => {
        console.log('Programs received from service:', data);
        this.programmes = data.map((program: any) => ({
          ...program
        }));
      },
      (error) => {
        console.log('Error fetching programs:', error);
      }
    );
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }

  printPage() {
    window.print();
  }


  navigateToInventoryForm(programme: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}`);
    this.router.navigate(['/county-stock-summary'], { queryParams: { programmeId: programme.programmeId} });
  }


  goBack(): void {
    this.router.navigate(['/counties']);
  }

}
