import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarVerticalChart } from './bar-vertical-chart';

describe('BarVerticalChart', () => {
  let component: BarVerticalChart;
  let fixture: ComponentFixture<BarVerticalChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarVerticalChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarVerticalChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
