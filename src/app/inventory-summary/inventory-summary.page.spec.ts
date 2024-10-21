import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventorySummaryPage } from './inventory-summary.page';

describe('InventorySummaryPage', () => {
  let component: InventorySummaryPage;
  let fixture: ComponentFixture<InventorySummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InventorySummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
