import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventas004Page } from './ventas004.page';

describe('Ventas004Page', () => {
  let component: Ventas004Page;
  let fixture: ComponentFixture<Ventas004Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ventas004Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ventas004Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
