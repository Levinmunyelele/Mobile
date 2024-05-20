import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgrammesPage } from './programmes.page';

describe('ProgrammesPage', () => {
  let component: ProgrammesPage;
  let fixture: ComponentFixture<ProgrammesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgrammesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
