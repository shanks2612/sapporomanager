import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C2AccountComponent } from './c2-account.component';

describe('C2AccountComponent', () => {
  let component: C2AccountComponent;
  let fixture: ComponentFixture<C2AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C2AccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C2AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
