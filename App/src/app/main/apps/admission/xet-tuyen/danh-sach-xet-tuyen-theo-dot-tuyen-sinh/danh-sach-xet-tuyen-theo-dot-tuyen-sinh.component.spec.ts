import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachXetTuyenTheoDotTuyenSinhComponent } from './danh-sach-xet-tuyen-theo-dot-tuyen-sinh.component';

describe('DanhSachXetTuyenTheoDotTuyenSinhComponent', () => {
  let component: DanhSachXetTuyenTheoDotTuyenSinhComponent;
  let fixture: ComponentFixture<DanhSachXetTuyenTheoDotTuyenSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachXetTuyenTheoDotTuyenSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachXetTuyenTheoDotTuyenSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
