import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C21CustomerComponent } from './c21-customer.component';

describe('C21CustomerComponent', () => {
  let component: C21CustomerComponent;
  let fixture: ComponentFixture<C21CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C21CustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C21CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
