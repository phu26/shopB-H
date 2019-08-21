import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachKhuVucUuTienComponent } from './danh-sach-khu-vuc-uu-tien.component';

describe('DanhSachKhuVucUuTienComponent', () => {
  let component: DanhSachKhuVucUuTienComponent;
  let fixture: ComponentFixture<DanhSachKhuVucUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachKhuVucUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachKhuVucUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
