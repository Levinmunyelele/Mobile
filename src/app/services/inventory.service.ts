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

  getInventory(payload: { programmeId: number; facilityId: number }): Observable<any> {
    const params = {
      programmeId: payload.programmeId,
      facilityId: payload.facilityId
    };
    return this.api.get('inventory', params).pipe(
      map(response => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error("Failed to fetch inventory data");
        }
      })
    );
  }

  approveInventory(facilityId: any, programmeId: any): Observable<any> {
    console.log('Calling approveInventory API with facilityId:', facilityId, 'and programmeId:', programmeId);

    return this.api.put(`inventory/approve-inventory?facilityId=${facilityId}&programmeId=${programmeId}`, null);
  }

  getProgrammes() {
    return this.api.get('programmes');
  }

  getFacilities(subCountyId: number): Observable<any[]> {
    return this.api.get(`facilities?subCountyId=${subCountyId}`).pipe(
      tap(() => {
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

  getCounties() {
    return this.api.get('counties');
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

  getInventoryLineByDrugId(text: any): Observable<any> {
    return this.api.get(`inventory-lines/` + text);
  }

  createInventory(inventoryData: { facilityId: number; programmeId: number; year: number; month: string; inventoryStatusId: number; categoryId: number }): Observable<any> {
    return this.api.post('inventory/create-inventory', inventoryData).pipe(
      tap(response => {
        console.log('Inventory created successfully:', response);
      })
    );
  }

  updateInventory(inventoryId: number, inventoryData: any) {
    return this.api.put(`inventory/update-inventory?inventoryId=${inventoryId}`, inventoryData);
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


  loadDrugName(drugId: number): Observable<any> {
    return this.api.get(`drugs/${drugId}`);
  }
  getFacilitiesByProgramAndPeriod(programmeId: number, year: number, month: number): Observable<any[]> {
    const params = new HttpParams()
      .set('programmeId', programmeId.toString())
      .set('year', year.toString())
      .set('month', month.toString());

    return this.api.get('inventory/filter-by-program-and-period', { params }).pipe(
      map((response: { facilities: any[] }) => response.facilities)
    );
  }


}