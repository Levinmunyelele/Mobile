import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service'


@Component({
  selector: 'app-facilityhome',
  templateUrl: './facilityhome.page.html',
  styleUrls: ['./facilityhome.page.scss'],
})
export class FacilityhomePage implements OnInit {

  facilityName!: string;
  inventoryData!: any[];
  programmes!: any[];
  currentDate!: Date;
  newNotificationsCount: number = 0;


  constructor(private router:Router, private http:HttpClient, private inventoryService: InventoryService , private menuController:MenuController,  private notificationService: NotificationService) { }
  
  ngOnInit() {
    this.currentDate = new Date();
    this.loadUserDetails();
    this.loadNotifications();
    this.loadProgrammes()
  }


  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.facility) {
      this.facilityName = user.facility; 
    } else {
      console.warn('User or facility information not found.');
    }
  }
  
  loadProgrammes() {
    this.inventoryService.getProgrammes().subscribe(
      (data: any) => {
        console.log('Programs received from service:', data);
        this.programmes = data.map((program: any) => ({
          ...program,
          status: 'Not Reported' 
        }));
      },
      (error) => {
        console.log('Error fetching programs:', error);
      }
    );
  }
    
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Pending Approval':
        return 'pending';
      case 'Not Reported':
        return 'not-reported';
      default:
        return ''; 
        
    }
  }
  toggleMenu() {
    this.menuController.toggle('menu'); 
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']); 
  }

  navigateToInventoryForm(programme: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}`);
    this.router.navigate(['/inventory-item'], { queryParams: { programmeId: programme.programmeId } });
  }
}