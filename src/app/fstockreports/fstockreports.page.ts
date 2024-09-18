import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fstockreports',
  templateUrl: './fstockreports.page.html',
  styleUrls: ['./fstockreports.page.scss'],
})
export class FstockreportsPage implements OnInit, OnDestroy{
  programmeId!: number;
  drugs: any[] = [];
  allDrugs: { [id: number]: string } = {};
  displayDrugs: boolean = false;
  programmeName!: string;
  facilityName!: string;

  currentDate!: Date;
  private inventoryDataSubscription!: Subscription;
  inventoryData: any;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private inventoryService: InventoryService
  ) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.programmeId = +params['programmeId'];
      this.loadUserDetails();
      this.loadProgrammeName();
      this.loadAllDrugs();
      this.currentDate = new Date();
    });

    this.inventoryDataSubscription = this.inventoryService.inventoryData$.subscribe((data: any[]) => {
      this.inventoryData = data.reduce((map, item) => {
        map[item.drugId] = item; 
        return map;
      }, {} as { [drugId: number]: any });
    });
  }

  ionViewWillEnter() {
    if (this.drugs.length === 0) {
      this.loadProgrammeDrugs();
    }
  }

  printPage(): void {
    window.print();
  }

  goToInventoryForm(drugId: number, programmeId: number) {
    this.router.navigate(['/inventory-form'], {
      queryParams: {
        drugId: drugId,
        programmeId: programmeId
      }
    });
  }

  loadUserDetails() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log('Fetched user details from sessionStorage:', user);

    if (user && user.facility) {
      this.facilityName = user.facility;
      console.log('Facility Name:', this.facilityName);
    } else {
      console.warn('User or facility information not found.');
    }
  }

  loadAllDrugs() {
    console.log('Fetching all drugs');
    this.http.get<any[]>(`http://qualipharmapi.local/v1/drugs`)
      .subscribe((drugs: any[]) => {
        console.log('All drugs fetched:', drugs);
        this.allDrugs = drugs.reduce((map, drug) => {
          map[drug.drugId] = drug.drugName;
          return map;
        }, {} as { [id: number]: string });
        this.loadProgrammeDrugs();
      }, (error) => {
        console.error('Error fetching drugs:', error);
      });
  }

  loadProgrammeDrugs() {
    console.log(`Fetching drugs for programmeId: ${this.programmeId}`);
    this.http.get<any[]>(`http://qualipharmapi.local/v1/programme-drugs?programmeId=${this.programmeId}`)
      .subscribe((programmeDrugs: any[]) => {
        console.log('Programme drugs fetched:', programmeDrugs);
        this.drugs = programmeDrugs.map(programmeDrug => ({
          ...programmeDrug,
          drugName: this.allDrugs[programmeDrug.drugId] || 'Unknown Drug',
          inventoryDetails: this.inventoryService.getInventoryDataByDrugId(programmeDrug.drugId) || {}
        }));
        this.displayDrugs = true;
      }, (error) => {
        console.error('Error fetching programme drugs:', error);
      });
  }

  updateDrugDetails() {
    if (this.inventoryData && this.drugs.length > 0) {
      this.drugs.forEach(drug => {
        if (this.inventoryData[drug.drugId]) {
          drug.inventoryDetails = this.inventoryData[drug.drugId];
        }
      });
    }
  }

  loadProgrammeName() {
    this.http.get<any>(`http://qualipharmapi.local/v1/programmes/${this.programmeId}`)
      .subscribe(programme => {
        this.programmeName = programme.programmeName || 'Unknown Programme';
        console.log('Programme name fetched:', this.programmeName);
      }, (error) => {
        console.error('Error fetching programme details:', error);
      });
  }

  goBack() {
    this.router.navigate(['/facilitystockreports']);
  }

  ngOnDestroy() {
    if (this.inventoryDataSubscription) {
      this.inventoryDataSubscription.unsubscribe();
    }
  }
}
