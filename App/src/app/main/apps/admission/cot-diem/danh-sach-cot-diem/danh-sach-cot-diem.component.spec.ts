import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachCotDiemComponent } from './danh-sach-cot-diem.component';

describe('DanhSachCotDiemComponent', () => {
  let component: DanhSachCotDiemComponent;
  let fixture: ComponentFixture<DanhSachCotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachCotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachCotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
