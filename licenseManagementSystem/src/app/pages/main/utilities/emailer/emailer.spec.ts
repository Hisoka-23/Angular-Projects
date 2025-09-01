import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emailer } from './emailer';

describe('Emailer', () => {
  let component: Emailer;
  let fixture: ComponentFixture<Emailer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emailer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emailer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
