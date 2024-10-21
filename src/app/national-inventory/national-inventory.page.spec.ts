import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalInventoryPage } from './national-inventory.page';

describe('NationalInventoryPage', () => {
  let component: NationalInventoryPage;
  let fixture: ComponentFixture<NationalInventoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
