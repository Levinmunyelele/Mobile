import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { LogoutService } from '../services/logout.service';
import { MenuController } from '@ionic/angular';
import { NotificationService, Notification } from './../services/notification.service';
import { MessageTemplateService } from './../services/message-template.service';
import { EMPTY, forkJoin } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

interface Programme {
  programmeName: string;
  reportingRate: number;
  programmeId: number;
}

@Component({
  selector: 'app-subhome',
  templateUrl: './subhome.page.html',
  styleUrls: ['./subhome.page.scss'],
})
export class SubhomePage implements OnInit {
  selectedMonth: string = '';
  selectedYear: number = 0;
  newNotificationsCount: number = 3;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  filteredProgrammes: Programme[] = [];
  subcounty: string = '';
  subcountyId: number | undefined;
  programmes: Programme[] = [];
  facilities: any[] = [];

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];

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
    this.initializeDefaults();
    this.loadProgrammes();
  }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.subCounty) {
      const subCountyName = user.subCounty.trim();
      console.log('SubCounty Name from user:', subCountyName);
      
      this.inventoryService.getSubcounties().subscribe(
        () => {
          this.subcountyId = this.inventoryService.getSubCountyIdByName(subCountyName);
          console.log('Mapped SubCounty ID:', this.subcountyId);
  
          if (this.subcountyId) {
            this.subcounty = subCountyName;
            console.log('Proceeding with loadProgrammes...');
            this.loadProgrammes();
          } else {
            console.warn('SubCounty ID not found for subCountyName:', subCountyName);
          }
        },
        error => {
          console.error('Error fetching subcounties:', error);
        }
      );
    } else {
      console.warn('User or subCounty information not found.');
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

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications: Notification[]) => {
        this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
      },
      error => console.error('Error fetching notifications:', error)
    );
  }

  toggleMenu() {
    this.menuController.toggle('menu');
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filteredProgrammes = [...this.programmes];
    }
  }

  filterProgrammes(): void {
    this.loadProgrammes();
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
    const selectedMonthIndex = this.months.indexOf(this.selectedMonth) + 1;
  
    if (selectedMonthIndex === 0) {
      console.error("Invalid month selected");
      return;
    }
  
    this.inventoryService.getProgrammes().subscribe(
      (programmes: Programme[]) => {
        this.programmes = programmes.map(programme => ({
          programmeName: programme.programmeName,
          reportingRate: 0,
          programmeId: programme.programmeId,
        }));
        this.filteredProgrammes = [...this.programmes];
  
        this.inventoryService.getFacilitiesBySubCounty(this.subcountyId!).subscribe(
          (response: any) => {
            const loadedFacilities = response.facilities || [];
            console.log(`Total facilities in subcounty ${this.subcountyId}: ${loadedFacilities.length}`);
  
            const programmeRequests = this.programmes.map(programme =>
              this.inventoryService.fetchReportingRate(
                this.subcountyId!,
                programme.programmeId,
                this.selectedYear,
                selectedMonthIndex
              ).pipe(
                map((reportingRate: number) => ({
                  ...programme,
                  reportingRate,
                }))
              )
            );
  
            forkJoin(programmeRequests).subscribe(
              updatedProgrammes => {
                this.filteredProgrammes = updatedProgrammes;
              },
              error => console.error('Error fetching reporting rates:', error)
            );
          },
          error => console.error('Error fetching facilities for subcounty:', error)
        );
      },
      error => console.error('Error fetching programmes:', error)
    );
  }
  
  navigateToInventoryForm(programme: any) {
    this.router.navigate(['/programmes'], {
      queryParams: {
        programmeId: programme.programmeId,
        programmeName: programme.programmeName,
      },
    });
  }
}
