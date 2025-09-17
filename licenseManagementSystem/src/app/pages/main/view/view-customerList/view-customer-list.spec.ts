import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerList } from './view-customer-list';

describe('CustomerList', () => {
  let component: ViewCustomerList;
  let fixture: ComponentFixture<ViewCustomerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
