import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://qualipharm-app.healthstrat.co.ke/api/v1/inventory';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<any> {
    console.log('Calling getInventory() method...');
    console.log('Making HTTP request to:', this.apiUrl);
    return this.http.get<any>(this.apiUrl);
  }
  getInventoryData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}