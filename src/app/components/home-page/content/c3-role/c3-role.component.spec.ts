import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C3RoleComponent } from './c3-role.component';

describe('C3RoleComponent', () => {
  let component: C3RoleComponent;
  let fixture: ComponentFixture<C3RoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C3RoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C3RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
