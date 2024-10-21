import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountyStockReportsPage } from './county-stock-reports.page';

describe('CountyStockReportsPage', () => {
  let component: CountyStockReportsPage;
  let fixture: ComponentFixture<CountyStockReportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountyStockReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
