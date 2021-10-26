import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C11CatalogueComponent } from './c11-catalogue.component';

describe('C11CatalogueComponent', () => {
  let component: C11CatalogueComponent;
  let fixture: ComponentFixture<C11CatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C11CatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C11CatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
