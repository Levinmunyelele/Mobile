import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { NotificationService, Notification } from './../services/notification.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-programme-summary',
  templateUrl: './programme-summary.page.html',
  styleUrls: ['./programme-summary.page.scss'],
})
export class ProgrammeSummaryPage implements OnInit {
  currentDate: Date = new Date();
  newNotificationsCount: number = 0;
  facilityName: string | undefined;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  subcountyId: any;
  subCountyName: any;
  facilities: any[] = [];
  filteredFacilities: any[] = [];
  searchStatus: string = ''; programmeName: any;
  programmeId: any;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.programmeId = +params['programmeId'];
      this.programmeName = params['programmeName'];
      this.subcountyId = +params['subCountyId'];
      this.subCountyName = params['subCountyName'];

      if (this.subcountyId) {
        this.loadFacilities();
      } else {
        console.warn('subcountyId is not available.');
      }
    });

    this.loadNotifications();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter triggered');
    this.loadNotifications();
    this.loadFacilities();
    this.loadInventoryStatuses();
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
            console.log('Facilities loaded for subcountyId:', this.subcountyId, this.facilities);

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

  filterFacilities() {
    if (this.searchStatus) {
      this.filteredFacilities = this.facilities.filter(facility =>
        facility.status.toLowerCase().includes(this.searchStatus.toLowerCase())
      );
    } else {
      this.filteredFacilities = this.facilities;
    }
  }


  goBack() {
    this.router.navigate(['counties']);
  }


  filterFacilitiesByStatus() {
    if (this.searchStatus.trim()) {
      this.filteredFacilities = this.facilities.filter(facility =>
        facility.status.toLowerCase().includes(this.searchStatus.toLowerCase())
      );
    } else {
      this.filteredFacilities = this.facilities;
    }
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchStatus = '';
      this.filteredFacilities = this.facilities;
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

  navigateToInventorySummary(programmeId: number, facility: any, subCountyName: any) {
    console.log(`Navigating to inventory summary page with programmeId: ${programmeId}, facilityName: ${facility.facilityName}, subCountyName: ${subCountyName}`);

    if (facility.status === 'Pending Approval' || facility.status === 'Approved') {
      this.router.navigate(['/inventory-summary'], {
        queryParams: {
          programmeId: programmeId,
          facilityName: facility.facilityName,
          subCountyName: subCountyName,
          subCountyId: this.subcountyId
        }
      });
    } else {
      console.warn(`Facility ${facility.facilityName} does not have a valid status for navigation.`);
    }
  }


  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }
}
