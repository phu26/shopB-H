import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietToHopCotDiemComponent } from './chi-tiet-to-hop-cot-diem.component';

describe('ChiTietToHopCotDiemComponent', () => {
  let component: ChiTietToHopCotDiemComponent;
  let fixture: ComponentFixture<ChiTietToHopCotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietToHopCotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietToHopCotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
