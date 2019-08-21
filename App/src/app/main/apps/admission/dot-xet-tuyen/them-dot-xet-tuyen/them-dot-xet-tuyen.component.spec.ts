import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDotXetTuyenComponent } from './them-dot-xet-tuyen.component';

describe('ThemDotXetTuyenComponent', () => {
  let component: ThemDotXetTuyenComponent;
  let fixture: ComponentFixture<ThemDotXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemDotXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemDotXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
