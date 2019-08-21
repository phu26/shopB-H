import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachLoaiDiemComponent } from './danh-sach-loai-diem.component';

describe('DanhSachLoaiDiemComponent', () => {
  let component: DanhSachLoaiDiemComponent;
  let fixture: ComponentFixture<DanhSachLoaiDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachLoaiDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachLoaiDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
