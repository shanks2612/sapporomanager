import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C13BrandComponent } from './c13-brand.component';

describe('C13BrandComponent', () => {
  let component: C13BrandComponent;
  let fixture: ComponentFixture<C13BrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C13BrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C13BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
