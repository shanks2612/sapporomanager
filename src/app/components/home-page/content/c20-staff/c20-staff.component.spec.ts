import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C20StaffComponent } from './c20-staff.component';

describe('C20StaffComponent', () => {
  let component: C20StaffComponent;
  let fixture: ComponentFixture<C20StaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C20StaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C20StaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
