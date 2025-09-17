import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListTable } from './customer-list-table';

describe('CustomerListTable', () => {
  let component: CustomerListTable;
  let fixture: ComponentFixture<CustomerListTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
