import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubCountiesPage } from './sub-counties.page';

describe('SubCountiesPage', () => {
  let component: SubCountiesPage;
  let fixture: ComponentFixture<SubCountiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubCountiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
