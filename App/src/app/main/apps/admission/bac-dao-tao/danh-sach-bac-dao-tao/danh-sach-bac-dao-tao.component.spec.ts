import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachBacDaoTaoComponent } from './danh-sach-bac-dao-tao.component';

describe('DanhSachBacDaoTaoComponent', () => {
  let component: DanhSachBacDaoTaoComponent;
  let fixture: ComponentFixture<DanhSachBacDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachBacDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachBacDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
