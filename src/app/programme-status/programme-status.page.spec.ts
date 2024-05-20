import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgrammeStatusPage } from './programme-status.page';

describe('ProgrammeStatusPage', () => {
  let component: ProgrammeStatusPage;
  let fixture: ComponentFixture<ProgrammeStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgrammeStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
