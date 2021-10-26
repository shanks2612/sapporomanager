import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C0HomeComponent } from './c0-home.component';

describe('C0HomeComponent', () => {
  let component: C0HomeComponent;
  let fixture: ComponentFixture<C0HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C0HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C0HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
