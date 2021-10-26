import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C30PermissionComponent } from './c30-permission.component';

describe('C30PermissionComponent', () => {
  let component: C30PermissionComponent;
  let fixture: ComponentFixture<C30PermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C30PermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C30PermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
