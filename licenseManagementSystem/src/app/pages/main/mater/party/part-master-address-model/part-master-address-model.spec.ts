import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMasterAddressModel } from './part-master-address-model';

describe('PartMasterAddressModel', () => {
  let component: PartMasterAddressModel;
  let fixture: ComponentFixture<PartMasterAddressModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartMasterAddressModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartMasterAddressModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
