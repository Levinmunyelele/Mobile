import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockReportsPage } from './stock-reports.page';

describe('StockReportsPage', () => {
  let component: StockReportsPage;
  let fixture: ComponentFixture<StockReportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
