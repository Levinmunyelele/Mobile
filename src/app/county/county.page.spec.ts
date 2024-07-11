import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountyPage } from './county.page';

describe('CountyPage', () => {
  let component: CountyPage;
  let fixture: ComponentFixture<CountyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
