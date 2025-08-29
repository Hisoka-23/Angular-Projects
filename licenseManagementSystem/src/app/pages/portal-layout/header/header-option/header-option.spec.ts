import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOption } from './header-option';

describe('HeaderOption', () => {
  let component: HeaderOption;
  let fixture: ComponentFixture<HeaderOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
