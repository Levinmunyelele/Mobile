import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryApprovalPage } from './inventory-approval.page';

describe('InventoryApprovalPage', () => {
  let component: InventoryApprovalPage;
  let fixture: ComponentFixture<InventoryApprovalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InventoryApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
