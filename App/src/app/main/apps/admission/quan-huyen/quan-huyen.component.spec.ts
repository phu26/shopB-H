import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanHuyenComponent } from './quan-huyen.component';

describe('QuanHuyenComponent', () => {
  let component: QuanHuyenComponent;
  let fixture: ComponentFixture<QuanHuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanHuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanHuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
