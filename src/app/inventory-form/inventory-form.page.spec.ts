import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryFormPage } from './inventory-form.page';

describe('InventoryFormPage', () => {
  let component: InventoryFormPage;
  let fixture: ComponentFixture<InventoryFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InventoryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
