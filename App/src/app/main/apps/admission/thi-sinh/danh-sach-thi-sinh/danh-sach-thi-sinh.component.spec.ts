import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachThiSinhComponent } from './danh-sach-thi-sinh.component';

describe('DanhSachThiSinhComponent', () => {
  let component: DanhSachThiSinhComponent;
  let fixture: ComponentFixture<DanhSachThiSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachThiSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachThiSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
