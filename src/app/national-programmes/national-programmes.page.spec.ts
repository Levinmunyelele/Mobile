import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalProgrammesPage } from './national-programmes.page';

describe('NationalProgrammesPage', () => {
  let component: NationalProgrammesPage;
  let fixture: ComponentFixture<NationalProgrammesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalProgrammesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
