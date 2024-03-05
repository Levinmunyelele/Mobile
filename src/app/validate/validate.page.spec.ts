import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatePage } from './validate.page';

describe('ValidatePage', () => {
  let component: ValidatePage;
  let fixture: ComponentFixture<ValidatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
