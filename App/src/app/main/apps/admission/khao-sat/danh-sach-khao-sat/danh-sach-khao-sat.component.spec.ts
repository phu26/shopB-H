import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachKhaoSatComponent } from './danh-sach-khao-sat.component';

describe('DanhSachKhaoSatComponent', () => {
  let component: DanhSachKhaoSatComponent;
  let fixture: ComponentFixture<DanhSachKhaoSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachKhaoSatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachKhaoSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
