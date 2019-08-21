import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachDoiTuongUuTienComponent } from './danh-sach-doi-tuong-uu-tien.component';

describe('DanhSachDoiTuongUuTienComponent', () => {
  let component: DanhSachDoiTuongUuTienComponent;
  let fixture: ComponentFixture<DanhSachDoiTuongUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachDoiTuongUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachDoiTuongUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
