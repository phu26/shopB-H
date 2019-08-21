import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTruongThptComponent } from './danh-sach-truong-thpt.component';

describe('DanhSachTruongThptComponent', () => {
  let component: DanhSachTruongThptComponent;
  let fixture: ComponentFixture<DanhSachTruongThptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTruongThptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTruongThptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
