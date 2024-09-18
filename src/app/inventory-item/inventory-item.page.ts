import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Subscription } from 'rxjs';


interface DrugDetails {
  [key: string]: string; 
}

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.page.html',
  styleUrls: ['./inventory-item.page.scss'],
})
export class InventoryItemPage implements OnInit, OnDestroy {
  inventoryDataById: { [key: string]: any } = {};
  programmeId!: number;
  drugs: any[] = [];
  allDrugs: DrugDetails = {}; 
  displayDrugs: boolean = false;
  allDrugDetails: { [id: number]: any } = {};
  programmeName!: string;
  facilityName!: string;
  selectedMonth: string = '';
  selectedYear: number | null = null;
  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
  years: number[] = [];
  currentDate!: Date;
  private inventoryDataSubscription!: Subscription;
  inventoryData: { [drugId: number]: any } = {};
  facilityId: number | null = null;
  currentDrug: any;
  showWarning: boolean | false = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService
  ) {
    const today = new Date();
    const currentYear = today.getFullYear();
    for (let year = currentYear; year >= 2020; year--) {
      this.years.push(year);
    }
  }

  ngOnInit() {
    this.loadFacilities();
    this.route.queryParams.subscribe(params => {
      this.programmeId = +params['programmeId'];
      this.loadProgrammeName();
      this.loadAllDrugs();
      this.loadProgrammeDrugs()
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

  loadFacilities() {
    this.inventoryService.getFacilities().subscribe((facilities: any[]) => {
      console.log('Fetched facilities:', facilities);
      this.matchFacilityId(facilities);
    }, (error) => {
      console.error('Error fetching facilities:', error);
    });
  }

  matchFacilityId(facilities: any[]) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.facilityName = user.facility || '';

    const matchedFacility = facilities.find((facility: any) => facility.facilityName === this.facilityName);

    if (matchedFacility) {
      this.facilityId = matchedFacility.facilityId;
      console.log('Facility ID matched:', this.facilityId);
    } else {
      console.warn('No matching facility found for:', this.facilityName);
    }
  }
  createInventory(drugId: number) {
    if (!this.selectedMonth || !this.selectedYear) {
      this.showWarning = true;
      return;
    } else {
      this.showWarning = false;
    }

    if (this.facilityId === null) {
      console.error('Facility ID is not set. Please check loadFacilities() method.');
      return;
    }

    const inventoryData = {
      facilityId: this.facilityId,
      programmeId: this.programmeId,
      year: this.selectedYear,
      month: this.selectedMonth,
      inventoryStatusId: 1,
      categoryId: 5,
      drugId: drugId
    };

    this.inventoryService.createInventory(inventoryData).subscribe(
      (response: any) => {
        if (response && response.inventoryId) {
          const inventoryId = response.inventoryId;
          this.goToInventoryForm(inventoryId, drugId, this.programmeId);
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      (error) => {
        console.error('Error creating inventory:', error);
      }
    );
  }

  loadProgrammeDrugs() {
    console.log(`Fetching drugs for programmeId: ${this.programmeId}`);
  
    this.inventoryService.getProgrammeDrugs(this.programmeId).subscribe(
      (programmeDrugs: any[]) => {
        console.log('Programme drugs fetched:', programmeDrugs);
  
        this.drugs = programmeDrugs
          .filter(programmeDrug => programmeDrug.programmeId === this.programmeId)
          .map(programmeDrug => ({
            ...programmeDrug,
            drugName: this.allDrugs[programmeDrug.drugId] || 'Unknown Drug',
            inventoryDetails: this.inventoryData[programmeDrug.drugId] || {}
          }));
          this.drugs.forEach(element => {
            console.log('ddddd',element.drugId)
            this.inventoryService.getInventoryLineByDrugId('?drugId='+element.drugId).subscribe((res)=>{
              console.log('levin',res)
              if(res.length > 0){
                element.inventory=res[res.length-1]
              }else{
                element.inventory={}
              }
            })
          });
          console.log('fdstrdstrd',this.drugs);
  
        this.displayDrugs = true;
      },
      (error) => {
        console.error('Error fetching programme drugs:', error);
      }
    );
  }
  



  goToInventoryForm(inventoryId: number, drugId: number, programmeId: number) {
    this.router.navigate(['/inventory-form'], {
      queryParams: {
        inventoryId,
        drugId,
        programmeId
      }
    });
  }
  loadAllDrugs() {
    console.log('Fetching all drugs');
    this.inventoryService.getAllDrugs().subscribe(
      (drugs: any[]) => {
        console.log('All drugs fetched:', drugs);
        this.allDrugs = drugs.reduce((map, drug) => {
          map[drug.drugId] = drug.drugName; // Ensure drugName is correctly assigned
          return map;
        }, {} as { [id: number]: string });
      },
      (error) => {
        console.error('Error fetching drugs:', error);
      }
    );
  }
  
  
 

  loadProgrammeName() {
    console.log('Fetching programme details for programmeId:', this.programmeId);
    this.inventoryService.getProgrammeDetails(this.programmeId).subscribe(
      programmes => {
        console.log('Programme details fetched:', programmes);

        if (programmes && programmes.length > 0) {
          const selectedProgramme = programmes.find((p: { programmeId: number; }) => p.programmeId === this.programmeId);
          if (selectedProgramme) {
            this.programmeName = selectedProgramme.programmeName;
            console.log('Programme name set to:', this.programmeName);
          } else {
            console.warn('Programme with the provided ID not found in response.');
          }
        } else {
          this.programmeName = 'Programme not found';
        }
      },
      (error) => {
        console.error('Error fetching programme details:', error);
      }
    );
  }



  goBack() {
    this.router.navigate(['/facilities']);
  }

  ngOnDestroy() {
    if (this.inventoryDataSubscription) {
      this.inventoryDataSubscription.unsubscribe();
    }
  }

}  