import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

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
  updatedProgrammeId: string = 'someProgrammeId'; 
  updatedStatus: string = 'someStatus'; 
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
  form: any;
  inventoryId: null | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService,
    private alertController: AlertController
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
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const facilityName = user?.facility; // User's facility name
    const userSubCountyName = user?.subCounty; // User's subcounty name
  
    console.log('User Subcounty Name:', userSubCountyName);
    console.log('Facility Name:', facilityName);
  
    if (!facilityName) {
      console.error('Facility Name is missing.');
      return;
    }
  
    if (!userSubCountyName) {
      console.error('User Subcounty Name is missing.');
      return;
    }
  
    // Fetch all subcounties first
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
  
        // Now fetch facilities based on the userSubCountyId
        this.inventoryService.getFacilities(userSubCountyId).subscribe(
          (facilities: any[]) => {
            if (!facilities.length) {
              console.error('No facilities found for this subcounty.');
              return;
            }
  
            // Find the facility that matches the user's facility name
            const matchedFacility = facilities.find(
              (facility: any) => facility.facilityName.toLowerCase().trim() === facilityName.toLowerCase().trim()
            );
  
            if (matchedFacility) {
              this.facilityId = matchedFacility.facilityId;
              console.log('Facility ID matched:', this.facilityId);
            } else {
              console.warn('No matching facility found for:', facilityName);
            }
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
  }
  
  createInventory(drugId: number) {
    if (!this.selectedMonth || !this.selectedYear) {
      this.showWarning = true;
      return;
    } else {
      this.showWarning = false;
    }
  
    this.loadFacilities(); 
  
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
          this.inventoryId = inventoryId;  
          console.log('Inventory created with ID:', this.inventoryId);
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

  isExistingInventory(): boolean {
    return this.inventoryId !== null;
  }

  async presentAlert(updatedProgrammeId: any, updatedFacilityId: any, inventoryStatusId: number) {
    const alert = await this.alertController.create({
      header: 'Report Submission',
      message: 'Your Report has been submitted successfully.',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Programme ID:', updatedProgrammeId);
          console.log('Facility ID:', updatedFacilityId);
          console.log('Inventory Status ID:', inventoryStatusId);
  
          this.router.navigate(['/facilitystockreports'], {
            queryParams: {
              facilityId: updatedFacilityId,
              programmeId: updatedProgrammeId,
              inventoryStatusId: inventoryStatusId,
            }
          });
        }
      }]
    });
  
    await alert.present();
  }
   

  submitForm() {
    if (!this.selectedMonth || !this.selectedYear) {
      this.showWarning = true;
      return;
    } else {
      this.showWarning = false;
    }
  
    let inventoryData: any = {
      facilityId: this.facilityId,
      programmeId: this.programmeId, 
      year: this.selectedYear,
      month: this.selectedMonth,
      inventoryStatusId: this.isExistingInventory() ? 2 : 1, 
      categoryId: 5,
      drugs: this.drugs.map(drug => ({
        drugId: drug.drugId,
        beginningBalance: drug.inventory.beginningBalance,
        received: drug.inventory.received,
        dispensed: drug.inventory.dispensed,
        losses: drug.inventory.losses,
        positiveAdjustment: drug.inventory.positiveAdjustment,
        negativeAdjustment: drug.inventory.negativeAdjustment,
      }))
    };
  
    console.log('submitForm: Inventory Data:', inventoryData);
  
    if (this.isExistingInventory()) {
      if (!this.inventoryId) {
        console.error('Inventory ID is missing, cannot update.');
        return;
      }
  
      this.inventoryService.updateInventory(this.inventoryId, inventoryData).subscribe(
        response => {
          console.log('Inventory updated successfully', response);
  
          console.log('submitForm: Calling presentAlert with updated programmeId and status');
          this.presentAlert(inventoryData.programmeId, inventoryData.facilityId, inventoryData.inventoryStatusId);
        },
        error => {
          console.error('Error updating inventory:', error);
        }
      );
    } else {
      this.inventoryService.createInventory(inventoryData).subscribe(
        (response: any) => {
          if (response && response.inventoryId) {
            this.inventoryId = response.inventoryId;
            console.log('Inventory created successfully with ID:', this.inventoryId);
  
            console.log('submitForm: Calling presentAlert with created programmeId and status');
            this.presentAlert(inventoryData.programmeId, inventoryData.facilityId, inventoryData.inventoryStatusId);
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        (error) => {
          console.error('Error creating inventory:', error);
        }
      );
    }
  }
  
  submitAndAlert() {
    this.submitForm();
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