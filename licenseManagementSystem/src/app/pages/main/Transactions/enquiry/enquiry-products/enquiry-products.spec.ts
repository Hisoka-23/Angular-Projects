import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryProducts } from './enquiry-products';

describe('EnquiryProducts', () => {
  let component: EnquiryProducts;
  let fixture: ComponentFixture<EnquiryProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
