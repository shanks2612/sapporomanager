import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotpermitPageComponent } from './notpermit-page.component';

describe('NotpermitPageComponent', () => {
  let component: NotpermitPageComponent;
  let fixture: ComponentFixture<NotpermitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotpermitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotpermitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
