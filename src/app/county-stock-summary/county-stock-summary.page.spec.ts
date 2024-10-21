import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountyStockSummaryPage } from './county-stock-summary.page';

describe('CountyStockSummaryPage', () => {
  let component: CountyStockSummaryPage;
  let fixture: ComponentFixture<CountyStockSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountyStockSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
