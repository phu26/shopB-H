import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDSDonViHanhChinhComponent } from './quan-ly-dsdon-vi-hanh-chinh.component';

describe('QuanLyDSDonViHanhChinhComponent', () => {
  let component: QuanLyDSDonViHanhChinhComponent;
  let fixture: ComponentFixture<QuanLyDSDonViHanhChinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyDSDonViHanhChinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyDSDonViHanhChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
