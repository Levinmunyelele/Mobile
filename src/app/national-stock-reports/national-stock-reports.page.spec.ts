import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalStockReportsPage } from './national-stock-reports.page';

describe('NationalStockReportsPage', () => {
  let component: NationalStockReportsPage;
  let fixture: ComponentFixture<NationalStockReportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalStockReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
