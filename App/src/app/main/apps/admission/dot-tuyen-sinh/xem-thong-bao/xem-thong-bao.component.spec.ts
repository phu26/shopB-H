import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThongBaoComponent } from './xem-thong-bao.component';

describe('XemThongBaoComponent', () => {
  let component: XemThongBaoComponent;
  let fixture: ComponentFixture<XemThongBaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemThongBaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
