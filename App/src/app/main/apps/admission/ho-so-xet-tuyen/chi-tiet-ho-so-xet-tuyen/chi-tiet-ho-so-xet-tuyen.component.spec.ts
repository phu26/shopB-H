import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHoSoXetTuyenComponent } from './chi-tiet-ho-so-xet-tuyen.component';

describe('ChiTietHoSoXetTuyenComponent', () => {
  let component: ChiTietHoSoXetTuyenComponent;
  let fixture: ComponentFixture<ChiTietHoSoXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietHoSoXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietHoSoXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
