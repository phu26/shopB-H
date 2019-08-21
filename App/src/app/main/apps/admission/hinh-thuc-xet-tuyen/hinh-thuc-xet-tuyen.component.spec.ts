import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucXetTuyenComponent } from './hinh-thuc-xet-tuyen.component';

describe('HinhThucXetTuyenComponent', () => {
  let component: HinhThucXetTuyenComponent;
  let fixture: ComponentFixture<HinhThucXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
