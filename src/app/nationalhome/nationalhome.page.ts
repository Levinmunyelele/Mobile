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

interface County {
  countyId: number;
  countyName: string;
  programmes: Programme[];
}

@Component({
  selector: 'app-nationalhome',
  templateUrl: './nationalhome.page.html',
  styleUrls: ['./nationalhome.page.scss'],
})
export class NationalhomePage implements OnInit {
  selectedMonth: string = '';
  selectedYear: number = 0;
  newNotificationsCount: number = 3;
  searchQuery: string = '';
  filteredProgrammes: County[] = [];
  counties: County[] = [];
  programmes: Programme[] = [];
  userType: any;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];
  filteredCounties: any[] = [];
  selectedCounty: number | undefined;
  

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
    this.initializeDefaults();
    this.loadCountiesAndProgrammes(); 
  }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log('Loaded user from sessionStorage:', user);
    if (user && user.userType) {
      this.userType = user.userType;
      console.log('User Type:', this.userType);
    } else {
      console.warn('User or type information not found.');
    }
  }

  onDateChange(): void {
    if (!this.selectedMonth || !this.selectedYear) {
      console.error("Both month and year must be selected to fetch data.");
      return;
    }
    this.loadProgrammes();  
  }

  initializeDefaults() {
    const currentDate = new Date();
    const previousMonthIndex = currentDate.getMonth() - 1;
    this.selectedMonth = this.months[previousMonthIndex < 0 ? 11 : previousMonthIndex];
    this.selectedYear = previousMonthIndex < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
  }

  loadCountiesAndProgrammes() {
    this.inventoryService.getCounties().subscribe(
      (countiesResponse: County[]) => {
        this.counties = countiesResponse;
    
        const mombasa = this.counties.find(county => county.countyName && county.countyName.toLowerCase() === 'mombasa'.toLowerCase());
        
        if (mombasa) {
          this.selectedCounty = mombasa.countyId; 
          this.filteredCounties = [mombasa]; 
          this.loadProgrammes(); 
        } else {
          console.log('Mombasa not found');
        }
      },
      (error) => {
        console.error('Error loading counties:', error);
      }
    );
  }
  
  
  loadProgrammes(): void {
    if (this.filteredCounties.length === 0) return; 
    
    this.filteredCounties.forEach((county) => {
      county.programmes = []; 
  
      const monthNumber = this.months.indexOf(this.selectedMonth) + 1; 
  
      this.inventoryService.getProgrammes().subscribe(
        (programmesResponse: Programme[]) => {
          programmesResponse.forEach((programme) => {
            this.inventoryService.getReportingRate(county.countyId, programme.programmeId, this.selectedYear, monthNumber).subscribe(
              (reportingRate) => {
                programme.reportingRate = reportingRate || 0; 
                county.programmes.push(programme); 
                console.log(`Added programme: ${programme.programmeName}, Reporting Rate: ${programme.reportingRate}, County: ${county.countyName}`);
              },
              (error) => {
                console.error('Error fetching reporting rate for programme', programme.programmeId, 'in county', county.countyId, error);
              }
            );
          });
        },
        (error) => {
          console.error('Error fetching programmes:', error);
        }
      );
    });
  }  
  
  onCountyChange(event: any) {
    const selectedCountyId = event.detail.value;
    console.log('Selected County ID:', selectedCountyId);
  
    const selectedCounty = this.counties.find(county => county.countyId === selectedCountyId);
  
    if (selectedCounty) {
      this.filteredCounties = [selectedCounty];
      
      selectedCounty.programmes = []; 
      
      this.loadProgrammes();
    } else {
      console.log('County not found');
    }
  }
  

  filterCounties() {
    if (this.searchQuery.trim()) {
      this.loadCountiesAndProgrammes();
    } else {
      this.filteredCounties = [];
    }
  }

  toggleMenu() {
    this.menuController.toggle('menu');
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }


  getStatusColor(reportingRate: number): string {
    const percentage = reportingRate * 100; 
    if (percentage >= 50) {
      return 'success';
    } else if (percentage > 20 && percentage < 49) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
  
  navigateToProgrammeSummary(programme: any, county: any) {
    console.log(`Navigating to inventory page with programmeId: ${programme.programmeId}, programmeName: ${programme.programmeName}, countyId: ${county.countyId}, countyName: ${county.countyName}`);
    this.router.navigate(['/national-programmes'], {
      queryParams: {
        programmeId: programme.programmeId,
        programmeName: programme.programmeName,
        countyId: county.countyId,
        countyName: county.countyName
      }
    });
  }
}
