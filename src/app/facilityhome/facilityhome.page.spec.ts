import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilityhomePage } from './facilityhome.page';

describe('FacilityhomePage', () => {
  let component: FacilityhomePage;
  let fixture: ComponentFixture<FacilityhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacilityhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
