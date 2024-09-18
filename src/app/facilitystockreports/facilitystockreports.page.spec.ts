import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilitystockreportsPage } from './facilitystockreports.page';

describe('FacilitystockreportsPage', () => {
  let component: FacilitystockreportsPage;
  let fixture: ComponentFixture<FacilitystockreportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacilitystockreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
