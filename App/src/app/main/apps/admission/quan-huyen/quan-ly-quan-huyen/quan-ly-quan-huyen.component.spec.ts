import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyQuanHuyenComponent } from './quan-ly-quan-huyen.component';

describe('QuanLyQuanHuyenComponent', () => {
  let component: QuanLyQuanHuyenComponent;
  let fixture: ComponentFixture<QuanLyQuanHuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLyQuanHuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyQuanHuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
