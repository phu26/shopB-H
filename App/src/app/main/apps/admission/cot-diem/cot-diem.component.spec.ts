import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotDiemComponent } from './cot-diem.component';

describe('CotDiemComponent', () => {
  let component: CotDiemComponent;
  let fixture: ComponentFixture<CotDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
