import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { LogoutService } from '../services/logout.service';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service';
import { MessageTemplateService } from './../services/message-template.service';

interface Programme {
  programmeName: string;
  reportingRate: number;
}
@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {
  selectedMonth: string = 'July';
  selectedYear: number = 2020;
  newNotificationsCount: number = 3;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  filteredProgrammes: Programme[] = [];
  county: string = '';
  programmes: Programme[] = [];
  subcounties: any[] = [];
  userCountyId: number | null = null;
  filteredSubcounties: any[] = [];

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];
  counties: any[] | undefined;
  userCounty: any;
  searchStatus: string='';

  constructor(
    private router: Router,
    private http: HttpClient,
    private inventoryService: InventoryService,
    private logoutService: LogoutService,
    private menuController: MenuController,
    private messageTemplateService: MessageTemplateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadUserDetails();
    this.loadNotifications();
    this.loadProgrammes();
    this.loadCounties();
    this.loadSubcounties();
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

  loadCounties() {
    this.inventoryService.getCounties().subscribe(
      (response: any[]) => {
        this.counties = response;
        console.log('Counties:', this.counties);

        const matchedCounty = this.counties.find(
          (county) => county.countyName === this.userCounty
        );

        if (matchedCounty) {
          this.userCountyId = matchedCounty.countyId;
          console.log('User County ID:', this.userCountyId);  
        } else {
          console.warn('User county not found in the list of counties.');
        }
        this.filterSubcountiesByCounty();
      },
      (error) => {
        console.error('Error loading counties:', error);
      }
    );
  }

  loadSubcounties() {
    this.inventoryService.getSubcounties().subscribe(
      (response: any[]) => {
        console.log('Unfiltered Subcounties:', response);  
        this.subcounties = response;
        this.filterSubcountiesByCounty();
      },
      (error) => {
        console.error('Error loading subcounties:', error);
      }
    );
  }


  filterSubcountiesByCounty() {
    if (this.userCountyId) {
      this.filteredSubcounties = this.subcounties
        .filter(subcounty => subcounty.countyId === this.userCountyId)
        .map(subcounty => ({
          ...subcounty,
          programmes: this.programmes
        }));

      console.log('Filtered Subcounties with Programmes:', this.filteredSubcounties);
    }
  }



  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  filterSubCounties() {
    if (this.searchQuery.trim()) {
      this.filteredSubcounties = this.filteredSubcounties.filter(subcounty =>
        subcounty.subCountyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filterSubcountiesByCounty();
    }
  
    console.log('Filtered Subcounties:', this.filteredSubcounties);
  }
  
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filterSubcountiesByCounty();
    }
  }  

  toggleMenu() {
    this.menuController.toggle('menu');
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }

  getProgressBarColor(rate: number): string {
    if (rate < 0.5) {
      return 'danger'; 
    } else if (rate < 0.75) {
      return 'warning'; 
    } else {
      return 'success'; 
    }
  }

  getStatusColor(rate: number): string {
    if (rate < 0.5) {
      return 'low-rate';
    } else if (rate < 0.75) {
      return 'medium-rate';
    } else {
      return 'high-rate';
    }
  }


  loadProgrammes(): void {
    this.inventoryService.getProgrammes().subscribe(
      (data: Programme[]) => {
        this.programmes = data.map((program: any) => ({
          programmeName: program.programmeName,
          reportingRate: 0.9,
          programmeId: program.programmeId,
        }));
        this.filteredProgrammes = this.programmes;
      },
      (error) => {
        console.error('Error fetching programmes:', error);
      }
    );
  }

  navigateToProgrammeSummary(programme: any, subcounty: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}, programmeName: ${programme.programmeName}, subCountyId: ${subcounty.subCountyId}, subCountyName: ${subcounty.subCountyName}`);
    this.router.navigate(['/programme-summary'], {
      queryParams: {
        programmeId: programme.programmeId,
        programmeName: programme.programmeName,
        subCountyId: subcounty.subCountyId,
        subCountyName: subcounty.subCountyName
      }
    });
  }
  
}



