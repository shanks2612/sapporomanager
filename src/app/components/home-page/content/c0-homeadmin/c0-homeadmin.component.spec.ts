import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C0HomeadminComponent } from './c0-homeadmin.component';

describe('C0HomeadminComponent', () => {
  let component: C0HomeadminComponent;
  let fixture: ComponentFixture<C0HomeadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C0HomeadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C0HomeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
