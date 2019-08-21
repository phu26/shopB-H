import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotXetTuyenComponent } from './dot-xet-tuyen.component';

describe('DotXetTuyenComponent', () => {
  let component: DotXetTuyenComponent;
  let fixture: ComponentFixture<DotXetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotXetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotXetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
