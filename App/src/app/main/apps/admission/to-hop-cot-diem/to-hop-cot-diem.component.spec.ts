import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToHopCotDiemComponent } from './to-hop-cot-diem.component';

describe('ToHopCotDiemComponent', () => {
  let component: ToHopCotDiemComponent;
  let fixture: ComponentFixture<ToHopCotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToHopCotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToHopCotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
