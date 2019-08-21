import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XetTuyenComponent } from './xet-tuyen.component';

describe('XetTuyenComponent', () => {
  let component: XetTuyenComponent;
  let fixture: ComponentFixture<XetTuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XetTuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XetTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
