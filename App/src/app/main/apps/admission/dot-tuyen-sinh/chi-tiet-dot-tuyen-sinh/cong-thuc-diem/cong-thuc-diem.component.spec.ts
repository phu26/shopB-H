import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongThucDiemComponent } from './cong-thuc-diem.component';

describe('CongThucDiemComponent', () => {
  let component: CongThucDiemComponent;
  let fixture: ComponentFixture<CongThucDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongThucDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongThucDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
