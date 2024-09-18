import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NationalhomePage } from './nationalhome.page';

describe('NationalhomePage', () => {
  let component: NationalhomePage;
  let fixture: ComponentFixture<NationalhomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NationalhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
