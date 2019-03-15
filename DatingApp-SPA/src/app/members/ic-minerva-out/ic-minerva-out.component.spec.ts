/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IcMinervaOutComponent } from './ic-minerva-out.component';

describe('IcMinervaOutComponent', () => {
  let component: IcMinervaOutComponent;
  let fixture: ComponentFixture<IcMinervaOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcMinervaOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcMinervaOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
