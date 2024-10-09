import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { NotificationService, Notification } from './../services/notification.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.page.html',
  styleUrls: ['./programmes.page.scss'],
})
export class ProgrammesPage implements OnInit {
  currentDate: Date = new Date();
  newNotificationsCount: number = 0;
  facilityName: string | undefined;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  subcountyId: number | undefined;
  subcountyName: string | undefined; 
  facilities: any[] = [];
  filteredFacilities: any[] | undefined;
  programmeName: any;
  programmeId: any;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadSubcounties(); 
    this.loadNotifications();
    this.route.queryParams.subscribe(params => {
      this.programmeId = params['programmeId'];
      this.programmeName = params['programmeName'];
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter triggered');
    this.loadSubcounties();
    this.loadNotifications();
    this.loadFacilities();
    this.loadInventoryStatuses();
  }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.subCounty) {
      const subCountyName = user.subCounty.trim();
      this.subcountyId = this.inventoryService.getSubCountyIdByName(subCountyName); 
      this.subcountyName = subCountyName; 
      if (this.subcountyId) {
        this.loadFacilities();
      } else {
        console.warn('SubCounty ID not found for subCountyName:', subCountyName);
      }
    } else {
      console.warn('User or subcounty information not found.');
    }
  }

  loadFacilities() {
    if (this.subcountyId !== undefined) {
      this.inventoryService.getFacilitiesBySubCounty(this.subcountyId).subscribe(
        (response: any) => {
          if (response && response.facilities && Array.isArray(response.facilities)) {
            this.facilities = response.facilities.map((facility: any) => {
              return {
                ...facility,
                status: 'Not Reported' 
              };
            });
            console.log('Facilities loaded:', this.facilities);

            this.loadInventoryStatuses();
          } else {
            console.error('Unexpected data format:', response);
          }
        },
        (error) => {
          console.error('Error fetching facilities:', error);
        }
      );
    } else {
      console.warn('subcountyId is undefined');
    }
  }

  loadInventoryStatuses() {
    this.facilities.forEach((facility) => {
      const payload = { programmeId: this.programmeId, facilityId: facility.facilityId };
      this.inventoryService.getInventory(payload).subscribe(
        (inventoryData) => {
          if (inventoryData && inventoryData.inventoryStatusName) {
            facility.status = inventoryData.inventoryStatusName; 
            console.log(`Updated status for facilityId: ${facility.facilityId} to ${facility.status}`);
          } else {
            console.warn(`No inventory data found for programmeId: ${this.programmeId} and facilityId: ${facility.facilityId}`);
          }
        },
        (error) => {
          console.error(`Error fetching inventory data for programmeId: ${this.programmeId} and facilityId: ${facility.facilityId}`, error);
        }
      );
    });
  }

  loadSubcounties(): void {
    this.inventoryService.getSubcounties().subscribe(() => {
      this.loadUserDetails(); 
    }, error => {
      console.error('Error fetching subcounties:', error);
    });
  }

  filterFacilities() {
    this.filteredFacilities = this.facilities.filter(facility =>
      facility.facilityName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['/sub-counties']);
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filterFacilities();
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    }, error => {
      console.error('Error fetching notifications:', error);
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

  navigateToInventoryApproval(programme: any, facility: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}, facilityId: ${facility.facilityId}, subcountyId: ${this.subcountyId}`);
        this.router.navigate(['/inventory-approval'], { 
      queryParams: { 
        programmeId: programme.programmeId, 
        facilityId: facility.facilityId, 
        subcountyId: this.subcountyId 
      } 
    });
  }
  
  
  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }
}
