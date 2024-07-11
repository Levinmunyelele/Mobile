import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/inventory.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-subhome',
  templateUrl: './subhome.page.html',
  styleUrls: ['./subhome.page.scss'],
})
export class SubhomePage implements OnInit {
  [x: string]: any;
  facilityName!: string;
  inventoryData!: any[];
  currentDate!: Date;

  constructor(private router:Router, private http:HttpClient, private inventoryService: InventoryService) { }


  
  ngOnInit() {
    this.currentDate = new Date();
    this.loadInventory();
  }

  loadInventory(): void {
    this['inventoryService'].getInventory().subscribe(
      (data: any[]) => {
        console.log('Data received from service:', data);
        // Filter data by facility name
        const filteredData = data.filter(item => item.facilityName === 'Abrahams Clinic');
        // Assign facility name
        if (filteredData.length > 0) {
          this.facilityName = filteredData[0].facilityName;
        } else {
          console.error('No data found for Abrahams Clinic.');
        }
        // Assign inventory data
        this.inventoryData = filteredData;
      },
      (error: any) => {
        console.error('Error fetching inventory:', error);
      }
    );
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
        return ''; // Default class
    }
  }
} 
