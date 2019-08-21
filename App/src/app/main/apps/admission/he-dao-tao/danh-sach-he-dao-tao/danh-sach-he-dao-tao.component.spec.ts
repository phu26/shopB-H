import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHeDaoTaoComponent } from './danh-sach-he-dao-tao.component';

describe('DanhSachHeDaoTaoComponent', () => {
  let component: DanhSachHeDaoTaoComponent;
  let fixture: ComponentFixture<DanhSachHeDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachHeDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachHeDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
