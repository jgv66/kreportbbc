import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventas011Page } from './ventas011.page';

describe('Ventas011Page', () => {
  let component: Ventas011Page;
  let fixture: ComponentFixture<Ventas011Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ventas011Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ventas011Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
