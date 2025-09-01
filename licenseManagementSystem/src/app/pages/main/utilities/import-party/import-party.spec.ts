import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportParty } from './import-party';

describe('ImportParty', () => {
  let component: ImportParty;
  let fixture: ComponentFixture<ImportParty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportParty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportParty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
