import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgrammeSummaryPage } from './programme-summary.page';

describe('ProgrammeSummaryPage', () => {
  let component: ProgrammeSummaryPage;
  let fixture: ComponentFixture<ProgrammeSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgrammeSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
