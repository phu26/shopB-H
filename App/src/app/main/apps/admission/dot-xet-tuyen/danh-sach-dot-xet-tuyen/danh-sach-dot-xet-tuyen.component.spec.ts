import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachDotXetTuyenComponent } from './danh-sach-dot-xet-tuyen.component';

describe('DanhSachDotXetTuyenComponent', () => {
  let component: DanhSachDotXetTuyenComponent;
  let fixture: ComponentFixture<DanhSachDotXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachDotXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachDotXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
