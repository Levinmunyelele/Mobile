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
  selector: 'app-subhome',
  templateUrl: './subhome.page.html',
  styleUrls: ['./subhome.page.scss'],
})
export class SubhomePage implements OnInit {
  selectedMonth: string = 'July';
  selectedYear: number = 2020;
  newNotificationsCount: number = 3;
  searchQuery: string = '';
  showSearchBar: boolean = false;
  filteredProgrammes: Programme[] = [];
  subcounty: string = '';

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];
  programmeData = [
    { programmeName: 'Family Planning', reportingRate: 0.8333 },
    { programmeName: 'Malaria', reportingRate: 0.6667 },
    { programmeName: 'HIV 2017 Form', reportingRate: 0 },
    { programmeName: 'TB', reportingRate: 0.6667 },
    { programmeName: 'Tracer Pharmaceuticals', reportingRate: 0.6667 },
    { programmeName: 'Tracer Non-Pharmaceuticals', reportingRate: 0.5 },
    { programmeName: 'RH Pharmaceutical Commodities', reportingRate: 0.6667 },
    { programmeName: 'RH Non-Pharmaceutical Commodities', reportingRate: 0.6667 },
    { programmeName: 'HIV 2019 Form', reportingRate: 0.6667 },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private inventoryService: InventoryService,
    private logoutService: LogoutService,
    private menuController: MenuController,
    private messageTemplateService: MessageTemplateService,
    private notificationService: NotificationService
  ) {}
  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.subCounty) {
      this.subcounty = user.subCounty;  
    } else {
      console.warn('User or subcounty information not found.');
    }
  }

  ngOnInit() {
    this.loadUserDetails();
    this.loadNotifications();
    this.filteredProgrammes = this.programmeData;
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.newNotificationsCount = notifications.filter(notification => notification.isNew).length;
    });
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.filteredProgrammes = this.programmeData;
    }
  }

  filterProgrammes() {
    this.filteredProgrammes = this.programmeData.filter(programme =>
      programme.programmeName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleMenu() {
    this.menuController.toggle('menu');
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']); 
  }

  getStatusIcon(reportingRate: number): string {
    if (reportingRate >= 0.8) {
      return 'checkmark-circle';
    } else if (reportingRate > 0 && reportingRate < 0.8) {
      return 'alert-circle';
    } else {
      return 'close-circle';
    }
  }

  getStatusColor(reportingRate: number): string {
    if (reportingRate >= 0.8) {
      return 'success';
    } else if (reportingRate > 0 && reportingRate < 0.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}

