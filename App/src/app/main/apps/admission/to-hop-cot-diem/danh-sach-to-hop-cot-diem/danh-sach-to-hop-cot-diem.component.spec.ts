import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachToHopCotDiemComponent } from './danh-sach-to-hop-cot-diem.component';

describe('DanhSachToHopCotDiemComponent', () => {
  let component: DanhSachToHopCotDiemComponent;
  let fixture: ComponentFixture<DanhSachToHopCotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachToHopCotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachToHopCotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
