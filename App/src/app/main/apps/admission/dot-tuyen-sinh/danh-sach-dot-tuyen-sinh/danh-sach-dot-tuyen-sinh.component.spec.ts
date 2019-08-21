import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachDotTuyenSinhComponent } from './danh-sach-dot-tuyen-sinh.component';

describe('DanhSachDotTuyenSinhComponent', () => {
  let component: DanhSachDotTuyenSinhComponent;
  let fixture: ComponentFixture<DanhSachDotTuyenSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachDotTuyenSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachDotTuyenSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
