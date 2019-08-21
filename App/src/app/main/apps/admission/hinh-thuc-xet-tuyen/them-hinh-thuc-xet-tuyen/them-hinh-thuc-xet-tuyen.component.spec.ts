import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemHinhThucXetTuyenComponent } from './them-hinh-thuc-xet-tuyen.component';

describe('ThemHinhThucXetTuyenComponent', () => {
  let component: ThemHinhThucXetTuyenComponent;
  let fixture: ComponentFixture<ThemHinhThucXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemHinhThucXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemHinhThucXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
