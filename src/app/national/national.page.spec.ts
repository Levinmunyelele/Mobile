import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalPage } from './national.page';

describe('NationalPage', () => {
  let component: NationalPage;
  let fixture: ComponentFixture<NationalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
