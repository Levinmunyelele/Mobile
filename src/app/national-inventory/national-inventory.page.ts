import { Router } from '@angular/router';
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { InventoryService } from '../services/inventory.service';
  import { Subscription } from 'rxjs';
  
  interface DrugDetails {
    [key: string]: string; 
  }
@Component({
  selector: 'app-national-inventory',
  templateUrl: './national-inventory.page.html',
  styleUrls: ['./national-inventory.page.scss'],
})
export class NationalInventoryPage implements OnInit {
    programmeId!: number;
    drugs: any[] = [];
    allDrugs: DrugDetails = {}; 
    displayDrugs: boolean = false;
    allDrugDetails: { [id: number]: any } = {};
    programmeName!: string;
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
    facilityId!: number;
    currentDrug: any;
    showWarning: boolean | false = false;
    subCountyName: any;
    subCountyId!: number; 
    facilityName: any;
    countyId!: number;
  countyName: any;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private inventoryService: InventoryService
    ) {
      const today = new Date();
      const currentYear = today.getFullYear();
      for (let year = currentYear; year >= 2020; year--) {
        this.years.push(year);
      }
    }
  
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.programmeId = +params['programmeId'];
        this.facilityId = +params['facilityId']; 
        this.countyId = +params['countyId'];
        this.countyName = params['countyName'];
        this.facilityName = params['facilityName'];
        this.subCountyId = +params['subCountyId'];
        this.subCountyName = params['subCountyName'];
    
        console.log('SubCountyId:', this.subCountyId);
        console.log('CountyName:', this.countyName); 
    
        this.loadProgrammeName();
        this.loadAllDrugs();
        this.loadProgrammeDrugs();
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
      const buttons = document.querySelectorAll('.print-exclude');
  
      buttons.forEach(button => {
        (button as HTMLElement).style.display = 'none';
      });
  
      window.print();
  
      buttons.forEach(button => {
        (button as HTMLElement).style.display = 'block';
      });
    }
  
    loadFacilities() {
      console.log('SubCounty ID:', this.subCountyId); 
  
      if (!this.subCountyId) {
        console.error('Subcounty ID is missing');
        return;
      }
  
      this.inventoryService.getFacilities(this.subCountyId).subscribe(
        (facilities: any[]) => {
          console.log('Fetched facilities:', facilities);
          this.matchFacilityId(facilities);
        },
        (error) => {
          console.error('Error fetching facilities:', error);
        }
      );
    }
  
    matchFacilityId(subCounty: any[]) {
      const matchedFacility = subCounty.find((subCounty: any) => subCounty.subCountyId === this.subCountyId);
  
      if (matchedFacility) {
        this.subCountyName = matchedFacility.subCountyName;
        console.log('Facility ID matched:', this.subCountyId);
      } else {
        console.warn('No matching facility found for SubCounty ID:', this.subCountyId);
      }
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
            console.log('Drug ID:', element.drugId);
            this.inventoryService.getInventoryLineByDrugId('?drugId=' + element.drugId).subscribe((res) => {
              console.log('Inventory Response:', res);
              if (res.length > 0) {
                element.inventory = res[res.length - 1];
              } else {
                element.inventory = {};
              }
            });
          });
          console.log('Drugs:', this.drugs);
  
          this.displayDrugs = true;
        },
        (error) => {
          console.error('Error fetching programme drugs:', error);
        }
      );
    }
  
    goToInventoryForm(inventoryId: number, drugId: number, programmeId: number) {
      this.router.navigate(['/programmes'], {
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
            map[drug.drugId] = drug.drugName; 
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
      console.log('Going back with subCountyId:', this.subCountyId); 
    
      if (this.subCountyId && !isNaN(this.subCountyId)) { 
        this.router.navigate(['national-programmes'], {
          queryParams: {
            programmeId: this.programmeId,    
            programmeName: this.programmeName,
            facilityId: this.facilityId,  
            countyId :this.countyId,  
            countyName :this.countyName, 
            facilityName: this.facilityName,  
            subCountyId: this.subCountyId,    
            subCountyName: this.subCountyName 
          }
        });
      } else {
        console.error('Invalid subCountyId before navigating:', this.subCountyId); 
      }
    }
    
    
  
    ngOnDestroy() {
      if (this.inventoryDataSubscription) {
        this.inventoryDataSubscription.unsubscribe();
      }
    }
  }
  