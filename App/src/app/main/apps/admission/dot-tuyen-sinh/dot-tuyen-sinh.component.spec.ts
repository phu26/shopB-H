import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotTuyenSinhComponent } from './dot-tuyen-sinh.component';

describe('DotTuyenSinhComponent', () => {
  let component: DotTuyenSinhComponent;
  let fixture: ComponentFixture<DotTuyenSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotTuyenSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotTuyenSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
