import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalStockSummaryPage } from './national-stock-summary.page';

describe('NationalStockSummaryPage', () => {
  let component: NationalStockSummaryPage;
  let fixture: ComponentFixture<NationalStockSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalStockSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
