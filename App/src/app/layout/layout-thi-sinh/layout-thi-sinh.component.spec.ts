import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutThiSinhComponent } from './layout-thi-sinh.component';

describe('LayoutThiSinhComponent', () => {
  let component: LayoutThiSinhComponent;
  let fixture: ComponentFixture<LayoutThiSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutThiSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutThiSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
