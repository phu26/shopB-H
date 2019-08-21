import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachNganhDaoTaoComponent } from './danh-sach-nganh-dao-tao.component';

describe('DanhSachNganhDaoTaoComponent', () => {
  let component: DanhSachNganhDaoTaoComponent;
  let fixture: ComponentFixture<DanhSachNganhDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachNganhDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachNganhDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
