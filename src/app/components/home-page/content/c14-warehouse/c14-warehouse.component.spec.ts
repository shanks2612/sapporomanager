import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C14WarehouseComponent } from './c14-warehouse.component';

describe('C14WarehouseComponent', () => {
  let component: C14WarehouseComponent;
  let fixture: ComponentFixture<C14WarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C14WarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C14WarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
