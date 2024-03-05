import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsNconditionsPage } from './terms-nconditions.page';

describe('TermsNconditionsPage', () => {
  let component: TermsNconditionsPage;
  let fixture: ComponentFixture<TermsNconditionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TermsNconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
