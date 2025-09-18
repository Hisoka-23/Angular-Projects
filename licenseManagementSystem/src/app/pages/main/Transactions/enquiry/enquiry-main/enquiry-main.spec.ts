import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryMain } from './enquiry-main';

describe('EnquiryMain', () => {
  let component: EnquiryMain;
  let fixture: ComponentFixture<EnquiryMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
