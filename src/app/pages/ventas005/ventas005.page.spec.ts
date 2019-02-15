import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventas005Page } from './ventas005.page';

describe('Ventas005Page', () => {
  let component: Ventas005Page;
  let fixture: ComponentFixture<Ventas005Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ventas005Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ventas005Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
