import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHeDaoTaoComponent } from './chi-tiet-he-dao-tao.component';

describe('ChiTietHeDaoTaoComponent', () => {
  let component: ChiTietHeDaoTaoComponent;
  let fixture: ComponentFixture<ChiTietHeDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietHeDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietHeDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
