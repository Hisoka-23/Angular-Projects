import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditCustomer } from './app-edit-customer';

describe('AppEditCustomer', () => {
  let component: AppEditCustomer;
  let fixture: ComponentFixture<AppEditCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEditCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
