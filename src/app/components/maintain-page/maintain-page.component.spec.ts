import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainPageComponent } from './maintain-page.component';

describe('MaintainPageComponent', () => {
  let component: MaintainPageComponent;
  let fixture: ComponentFixture<MaintainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
