import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerMisc } from './edit-customer-misc';

describe('EditCustomerMisc', () => {
  let component: EditCustomerMisc;
  let fixture: ComponentFixture<EditCustomerMisc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerMisc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerMisc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
