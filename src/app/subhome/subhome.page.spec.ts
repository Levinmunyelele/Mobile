import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubhomePage } from './subhome.page';

describe('SubhomePage', () => {
  let component: SubhomePage;
  let fixture: ComponentFixture<SubhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
