import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private subCountyMapping: { [key: string]: number } = {};
  private inventoryDataSubject = new BehaviorSubject<any[]>([]);
  inventoryData$: Observable<any[]> = this.inventoryDataSubject.asObservable();

  constructor(private api: ApiService) { }

  getInventory(payload: any): Observable<any> {
    return this.api.get('inventory', payload);
  }

  getProgrammes() {
    return this.api.get('programmes');
  }

  getFacilities(): Observable<any[]> {
    return this.api.get('facilities').pipe(
      tap((response: any) => {
        console.log('Facilities data received:', response);
      }),
      map((response: { facilities: any[] }) => response.facilities)
    );
  }

  getCategories() {
    return this.api.get('categories');
  }
  getAllDrugs() {
    return this.api.get('drugs');
  }
  
  getProgrammeDrugs(programmeId: number): Observable<any[]> {
    const params = new HttpParams().set('programmeId', programmeId.toString());
    return this.api.get('programme-drugs', { params });
  
  }

  getProgrammeDetails(programmeId: number): Observable<any> {
    const params = new HttpParams().set('programmeId', programmeId.toString());
    return this.api.get('programmes', { params });
  }
  
  getFacilitiesBySubCounty(subCountyId: number): Observable<any> {
    console.log('Fetching facilities for subCountyId:', subCountyId);
    return this.api.get('facilities', { subCountyId });
  }

  getSubcounties(): Observable<any> {
    console.log('Fetching subcounties data...');
    return this.api.get('sub-counties').pipe(
      tap((response: any[]) => {
        if (Array.isArray(response)) {
          this.subCountyMapping = response.reduce((map: { [key: string]: number }, subcounty: any) => {
            map[subcounty.subCountyName] = subcounty.subCountyId;
            return map;
          }, {});
          console.log('SubCounty mapping:', this.subCountyMapping);
        } else {
          console.error('Unexpected response format:', response);
        }
      })
    );
  }

  saveInventoryData(inventoryData: any): Observable<any> {
    return this.api.post('inventory-lines', inventoryData);
  }

  getSubCountyIdByName(name: string): number | undefined {
    return this.subCountyMapping[name];
  }

  getInventoryDataByDrugId(drugId: number): Observable<any> {
    return this.api.get(`inventory-lines/?inventoryId=${drugId}`);
  }

  getInventoryLineByDrugId(text:any): Observable<any> {
    return this.api.get(`inventory-lines/`+text);
  }

  createInventory(inventoryData: { facilityId: number; programmeId: number; year: number; month: string; inventoryStatusId: number; categoryId:number }): Observable<any> {
    return this.api.post('inventory/create-inventory', inventoryData).pipe(
      tap(response => {
        console.log('Inventory created successfully:', response);
      })
    );
  }
  
  getInventoryLines(drugId: number): Observable<any[]> {
    return this.api.get('inventory-lines', { params: { drugId } }).pipe(
      catchError(error => {
        console.error('Error fetching inventory lines', error);
        return throwError(error);
      })
    );
  }

  getInventoryData(inventoryId: string, drugId: string): Observable<any> {
    return this.api.get(`inventory-lines/${inventoryId}/drug/${drugId}`);
  }
  
}