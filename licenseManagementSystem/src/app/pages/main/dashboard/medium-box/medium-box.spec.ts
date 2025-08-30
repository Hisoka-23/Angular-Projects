import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumBox } from './medium-box';

describe('MediumBox', () => {
  let component: MediumBox;
  let fixture: ComponentFixture<MediumBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
