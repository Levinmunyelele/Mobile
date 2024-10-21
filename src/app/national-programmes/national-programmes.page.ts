import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { NotificationService, Notification } from './../services/notification.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-national-programmes',
  templateUrl: './national-programmes.page.html',
  styleUrls: ['./national-programmes.page.scss'],
})
export class NationalProgrammesPage implements OnInit {

  currentDate: Date = new Date();
  newNotificationsCount: number = 0;
  facilityName: string | undefined;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  facilities: any[] = [];
  filteredFacilities: any[] = [];
  searchStatus: string = ''; programmeName: any;
  programmeId: any;
  countyId: any;
  countyName: any;
  subcounties: any;
  subcountyId: undefined;
  filteredSubCounties: any[] = [];

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
      this.countyId = +params['countyId'];
      this.countyName = params['countyName'];
  
      console.log('Fetched from query params:', {
        programmeId: this.programmeId,
        programmeName: this.programmeName,
        countyId: this.countyId,
        countyName: this.countyName
      });
  
      if (this.countyId) {
        this.loadSubCounties();
      } else {
        console.warn('countyId is not available.');
      }
    });
  
    this.loadNotifications();
  }
  

  ionViewDidEnter() {
    console.log('ionViewDidEnter triggered');
    this.loadNotifications();
    this.loadFacilities();
    this.loadInventoryStatuses(this.facilities);
    this.loadSubCounties();
  }
  
  loadSubCounties() {
    this.inventoryService.getSubcounties().subscribe(
      (response: any[]) => {
        console.log('Loaded all Subcounties:', response);
        this.subcounties = response.filter(subcounty => subcounty.countyId === this.countyId);

        if (this.subcounties.length === 0) {
          console.warn('No subcounties found for the given countyId:', this.countyId);
        } else {
          console.log('Filtered Subcounties:', this.subcounties);
          this.loadFacilities();
        }
      },
      (error) => {
        console.error('Error loading subcounties:', error);
      }
    );
  }

  loadFacilities() {
    if (this.subcounties && this.subcounties.length > 0) {
      this.subcounties.forEach((subcounty: { subCountyId: any; facilities: any; }) => {
        const subcountyId = subcounty.subCountyId;
  
        this.inventoryService.getFacilitiesBySubCounty(subcountyId).subscribe(
          (response: any) => {
            if (response && response.facilities && Array.isArray(response.facilities)) {
              const last20Facilities = response.facilities.slice(-5).map((facility: any) => {
                return {
                  ...facility,
                  status: 'Not Reported' 
                };
              });
  
              subcounty.facilities = last20Facilities;
              console.log(`Facilities loaded for subcounty ${subcounty.subCountyId}:`, subcounty.facilities);
  
              this.loadInventoryStatuses(subcounty.facilities); 
            } else {
              console.error(`Unexpected data format for subcounty ${subcountyId}:`, response);
            }
          },
          (error) => {
            console.error(`Error fetching facilities for subcounty ${subcountyId}:`, error);
          }
        );
      });
    } else {
      console.warn('No subcounties available to load facilities.');
    }
  }
  
  
  loadInventoryStatuses(facilities: any[]) {
    facilities.forEach((facility) => {
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
    this.router.navigate(['/national']);
  }


  filterSubCounties() {
    if (this.searchQuery.trim()) {
      this.filteredSubCounties = this.subcounties.filter((subcounty: { subCountyName: string }) =>
        subcounty.subCountyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredSubCounties = [...this.subcounties];
    }
  
    console.log('Filtered Subcounties:', this.filteredSubCounties);
  }
  
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filterSubCounties(); 
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
  navigateToInventorySummary(
    programmeId: number,
    facility: any,
    subCountyName: string,
    subcountyId: number,
    countyId: number,
    countyName: string 
  ) {
    console.log(`Navigating to inventory summary page with programmeId: ${programmeId}, facilityName: ${facility.facilityName}, subCountyName: ${subCountyName}, subcountyId: ${subcountyId}, countyName: ${countyName}, countyId: ${countyId}`);
    if (facility.status === 'Pending Approval' || facility.status === 'Approved') {
    this.router.navigate(['/national-inventory'], {
      queryParams: {
        programmeId: programmeId,
        facilityId: facility.facilityId,
        facilityName: facility.facilityName,
        subCountyName: subCountyName,
        subCountyId: subcountyId,
        countyId: countyId,
        countyName: countyName 
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
