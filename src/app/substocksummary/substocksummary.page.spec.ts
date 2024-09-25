import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubstocksummaryPage } from './substocksummary.page';

describe('SubstocksummaryPage', () => {
  let component: SubstocksummaryPage;
  let fixture: ComponentFixture<SubstocksummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubstocksummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
