import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHinhThucXetTuyenComponent } from './danh-sach-hinh-thuc-xet-tuyen.component';

describe('DanhSachHinhThucXetTuyenComponent', () => {
  let component: DanhSachHinhThucXetTuyenComponent;
  let fixture: ComponentFixture<DanhSachHinhThucXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachHinhThucXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHinhThucXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
