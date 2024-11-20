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
  selectedMonth: string = 'July';
  selectedYear: number = 2020;
  newNotificationsCount: number = 3;
  searchQuery: string = '';
  filteredProgrammes: County[] = [];
  counties: County[] = []; 
  programmes: Programme[] = []; 
  userType: any;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];
  filteredCounties: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private inventoryService: InventoryService,
    private logoutService: LogoutService,
    private menuController: MenuController,
    private messageTemplateService: MessageTemplateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadUserDetails();
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

  loadCountiesAndProgrammes() {
    if (this.searchQuery.trim()) {
      this.inventoryService.getCounties().subscribe(
        (countiesResponse: County[]) => {
          this.counties = countiesResponse;
          this.filteredCounties = this.counties.filter(county =>
            county.countyName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.loadProgrammes(); // Only load programmes if counties are found
        },
        (error) => {
          console.error('Error loading counties:', error);
        }
      );
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

        // Assign programmes to filtered counties
        this.filteredCounties.forEach(county => {
          county.programmes = this.programmes;
        });
      },
      (error) => {
        console.error('Error fetching programmes:', error);
      }
    );
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
