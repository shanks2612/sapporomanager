import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C1ProductComponent } from './c1-product.component';

describe('C1ProductComponent', () => {
  let component: C1ProductComponent;
  let fixture: ComponentFixture<C1ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C1ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C1ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
