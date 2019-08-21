import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemKhaoSatComponent } from './them-khao-sat.component';

describe('ThemKhaoSatComponent', () => {
  let component: ThemKhaoSatComponent;
  let fixture: ComponentFixture<ThemKhaoSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemKhaoSatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemKhaoSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
