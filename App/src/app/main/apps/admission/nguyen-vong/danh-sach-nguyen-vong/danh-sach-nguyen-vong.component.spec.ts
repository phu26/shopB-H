/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DanhSachNguyenVongComponent } from './danh-sach-nguyen-vong.component';

describe('DanhSachNguyenVongComponent', () => {
  let component: DanhSachNguyenVongComponent;
  let fixture: ComponentFixture<DanhSachNguyenVongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachNguyenVongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachNguyenVongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
