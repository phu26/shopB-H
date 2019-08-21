import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHoSoXetTuyenComponent } from './danh-sach-ho-so-xet-tuyen.component';

describe('DanhSachHoSoXetTuyenComponent', () => {
  let component: DanhSachHoSoXetTuyenComponent;
  let fixture: ComponentFixture<DanhSachHoSoXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachHoSoXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHoSoXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
