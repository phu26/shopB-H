import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDotTuyenSinhComponent } from './chi-tiet-dot-tuyen-sinh.component';

describe('ChiTietDotTuyenSinhComponent', () => {
  let component: ChiTietDotTuyenSinhComponent;
  let fixture: ComponentFixture<ChiTietDotTuyenSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDotTuyenSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDotTuyenSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
