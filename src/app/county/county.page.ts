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
  programmeId: number;

}
@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {
  selectedMonth: string = '';
  selectedYear: number = 0;
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
  selectedSubcounty: number | null = null; 


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
    this.initializeDefaults();
  }

  onDateChange(): void {
    if (!this.selectedMonth || !this.selectedYear) {
      console.error("Both month and year must be selected to fetch data.");
      return;
    }
    this.filterSubcountiesByCounty();
  }
  
  
  initializeDefaults() {
    const currentDate = new Date();
    const previousMonthIndex = currentDate.getMonth() - 1;
    this.selectedMonth = this.months[previousMonthIndex < 0 ? 11 : previousMonthIndex];
    this.selectedYear = previousMonthIndex < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
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


  async filterSubcountiesByCounty() {
    if (this.userCountyId) {
      this.filteredSubcounties = []; // Clear the filtered list before processing
  
      for (const subcounty of this.subcounties.filter(s => s.countyId === this.userCountyId)) {
        const programmesWithRates = await this.calculateRatesForSubcounty(subcounty);
        this.filteredSubcounties.push({
          ...subcounty,
          programmes: programmesWithRates
        });
      }
    }
  }
  
  calculateRatesForSubcounty(subcounty: any): Promise<any[]> {
    const programmesWithRates = this.programmes.map(programme => ({
      ...programme,
      reportingRate: 0 // Initialize default reporting rate
    }));
  
    const ratePromises = programmesWithRates.map(programme =>
      new Promise<any>((resolve) => {
        this.inventoryService.fetchReportingRate(
          subcounty.subCountyId,
          programme.programmeId,
          this.selectedYear,
          this.months.indexOf(this.selectedMonth) + 1
        ).subscribe({
          next: (reportingRate) => {
            programme.reportingRate = reportingRate;
            resolve(programme); // Resolve when reporting rate is fetched
          },
          error: (error) => {
            console.error(`Error fetching reporting rate for Programme ${programme.programmeId}`, error);
            programme.reportingRate = 0; // Set to 0 on error
            resolve(programme);
          }
        });
      })
    );
    return Promise.all(ratePromises);
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


  getStatusColor(reportingRate: number): string {
    if (reportingRate >= 50) {
      return 'success';
    } else if (reportingRate > 0 && reportingRate < 20) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  loadProgrammes(): void {
    this.inventoryService.getProgrammes().subscribe(
      (data: Programme[]) => {
        this.programmes = data.map((program: any) => ({
          programmeName: program.programmeName,
          reportingRate: 0,
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



