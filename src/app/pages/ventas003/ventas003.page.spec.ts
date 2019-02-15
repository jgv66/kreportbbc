import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventas003Page } from './ventas003.page';

describe('Ventas003Page', () => {
  let component: Ventas003Page;
  let fixture: ComponentFixture<Ventas003Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ventas003Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ventas003Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
