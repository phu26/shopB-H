import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietCotDiemComponent } from './chi-tiet-cot-diem.component';

describe('ChiTietCotDiemComponent', () => {
  let component: ChiTietCotDiemComponent;
  let fixture: ComponentFixture<ChiTietCotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietCotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietCotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
