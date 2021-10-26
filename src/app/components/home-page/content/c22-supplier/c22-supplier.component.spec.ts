import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C22SupplierComponent } from './c22-supplier.component';

describe('C22SupplierComponent', () => {
  let component: C22SupplierComponent;
  let fixture: ComponentFixture<C22SupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C22SupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C22SupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
