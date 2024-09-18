import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FstockreportsPage } from './fstockreports.page';

describe('FstockreportsPage', () => {
  let component: FstockreportsPage;
  let fixture: ComponentFixture<FstockreportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FstockreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
