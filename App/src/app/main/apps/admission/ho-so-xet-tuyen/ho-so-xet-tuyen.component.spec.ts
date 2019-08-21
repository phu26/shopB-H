import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoXetTuyenComponent } from './ho-so-xet-tuyen.component';

describe('HoSoXetTuyenComponent', () => {
  let component: HoSoXetTuyenComponent;
  let fixture: ComponentFixture<HoSoXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoSoXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoSoXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
