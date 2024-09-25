import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service';



@Component({
  selector: 'app-stock-reports',
  templateUrl: './stock-reports.page.html',
  styleUrls: ['./stock-reports.page.scss'],
})
export class StockReportsPage implements OnInit {
  currentDate: Date = new Date();
  subcounty: string = '';
  programmes!: any[];
  newNotificationsCount: number = 0;

  goBack(): void {
    this.router.navigate(['/sub-counties']);
  }

  constructor(private router: Router, private location: Location, private menuController: MenuController ,private notificationService: NotificationService, private inventoryService : InventoryService) { }


  ngOnInit() {
    this.loadNotifications();
    this.loadUserDetails();
    this.loadProgrammes()

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

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log('user:', user)
    if (user && user.subCounty) {
      this.subcounty = user.subCounty;  
    } else {
      console.warn('User or subcounty information not found.');
    }
  }

  navigateToInventoryForm(programme: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}`);
    this.router.navigate(['/substocksummary'], { queryParams: { programmeId: programme.programmeId ,subcounty: this.subcounty} });
  }
}
