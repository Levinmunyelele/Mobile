import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryItemPage } from './inventory-item.page';

describe('InventoryItemPage', () => {
  let component: InventoryItemPage;
  let fixture: ComponentFixture<InventoryItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InventoryItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
