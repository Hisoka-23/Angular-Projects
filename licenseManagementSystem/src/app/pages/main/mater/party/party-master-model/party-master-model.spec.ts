import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMasterModel } from './party-master-model';

describe('PartyMasterModel', () => {
  let component: PartyMasterModel;
  let fixture: ComponentFixture<PartyMasterModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyMasterModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyMasterModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
