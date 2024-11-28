import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, Notification } from './../services/notification.service';

@Component({
  selector: 'app-facilitystockreports',
  templateUrl: './facilitystockreports.page.html',
  styleUrls: ['./facilitystockreports.page.scss'],
})
export class FacilitystockreportsPage implements OnInit {

  facilityName!: string;
  selectedMonth: string = 'July';
  selectedYear: number = 2024;
  inventoryData!: any[];
  programmes!: any[];
  currentDate!: Date;
  newNotificationsCount: number = 0;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2020, 2021, 2022, 2023, 2024];

  constructor(private router: Router,
    private http: HttpClient,
    private inventoryService: InventoryService,
    private menuController: MenuController,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.loadUserDetails();
    this.loadNotifications();
    this.loadProgrammes();
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

        this.updateProgrammesWithInventoryStatus();
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  updateProgrammesWithInventoryStatus() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const facilityName = user?.facility;
    const userSubCountyName = user?.subCounty;

    console.log('User:', user);
    console.log('Facility Name:', facilityName);
    console.log('User Subcounty Name:', userSubCountyName);

    if (!facilityName) {
      console.error('Facility Name is missing.');
      return;
    }

    if (!userSubCountyName) {
      console.error('User Subcounty Name is missing.');
      return;
    }

    this.inventoryService.getProgrammes().subscribe(
      (data: any) => {
        console.log('Programs received from service:', data);
        this.programmes = data.map((program: any) => ({
          ...program,
          status: program.status || 'Not Reported'  
        }));
  
        this.inventoryService.getSubcounties().subscribe(
          (subCounties: any[]) => {
            const userSubCounty = subCounties.find(
              subCounty => subCounty.subCountyName.toLowerCase().trim() === userSubCountyName.toLowerCase().trim()
            );
  
            if (!userSubCounty) {
              console.error(`Subcounty not found for user subcounty name: ${userSubCountyName}`);
              return;
            }
  
            const userSubCountyId = userSubCounty.subCountyId;
            console.log('User Subcounty ID:', userSubCountyId);
  
            this.inventoryService.getFacilities(userSubCountyId).subscribe(
              (facilities: any[]) => {
                if (!facilities.length) {
                  console.error('No facilities found for this subcounty.');
                  return;
                }
  
                const facility = facilities.find(
                  (facility: any) => facility.facilityName.toLowerCase().trim() === facilityName.toLowerCase().trim()
                );
  
                if (!facility) {
                  console.error(`Facility ID not found for the facility name: ${facilityName}`);
                  return;
                }
  
                const facilityId = facility.facilityId;
                console.log('Facility ID:', facilityId);
  
                this.programmes.forEach((programme: any) => {
                  const programmeId = programme.programmeId;
                  const previousStatus = programme.status;  
  
                  this.inventoryService.getInventory({ programmeId, facilityId }).subscribe(
                    (inventoryData: any) => {
                      let newStatus = inventoryData?.inventoryStatusName;
  
                      if (previousStatus === 'Approved') {
                        console.log(`Status for ${programme.programmeName} remains 'Approved' and cannot be changed.`);
                        programme.status = 'Approved';  
                      }
                      else if (previousStatus === 'Not Reported') {
                        programme.status = 'Not Reported';  
                        if (newStatus && newStatus !== 'Not Reported') {
                          programme.status = newStatus;  
                          console.log(`Updated status for ${programme.programmeName}: ${programme.status}`);
                        }
                      }
                      else if (previousStatus === 'Pending Approval') {
                        programme.status = 'Pending Approval';  
                        if (newStatus && newStatus !== 'Pending Approval') {
                          programme.status = newStatus;  
                          console.log(`Updated status for ${programme.programmeName}: ${programme.status}`);
                        }
                      }
                    },
                    (error) => {
                      console.error(`Error fetching inventory data for programmeId: ${programmeId}`, error);
                      programme.status = previousStatus;
                      console.log(`Error fetching inventory data for ${programme.programmeName}. Status reverted back to: ${programme.status}`);
                    }
                  );
                });
              },
              (error) => {
                console.error(`Error fetching facilities for subcountyId: ${userSubCountyId}`, error);
              }
            );
          },
          (error) => {
            console.error('Error fetching subcounties:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  getInventoryStatusLabel(inventoryStatusId: number): string {
    switch (inventoryStatusId) {
      case 1: return 'Approved';
      case 2: return 'Pending Approval';
      case 3: return 'Not Reported';
      default: return 'Unknown';
    }
  }

  updateProgrammeStatus(programmeName: string, status: string) {
    const programme = this.programmes.find(p => p.programmeName === programmeName);

    if (programme) {
      programme.status = status;
      console.log(`Programme ${programmeName} status updated to ${status}`);
    } else {
      console.warn(`Programme with name ${programmeName} not found.`);
    }
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

  goBack() {
    this.router.navigate(['/facilities']);
  }

  goToNotifications(): void {
    this.router.navigate(['/notification']);
  }

  navigateToInventoryForm(programme: any) {
    console.log(`Navigating to stock report page with programmeId: ${programme.programmeId}`);
    this.router.navigate(['/fstockreports'], { queryParams: { programmeId: programme.programmeId } });
  }
}
