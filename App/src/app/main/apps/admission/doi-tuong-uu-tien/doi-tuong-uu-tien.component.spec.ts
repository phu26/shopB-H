import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoiTuongUuTienComponent } from './doi-tuong-uu-tien.component';

describe('DoiTuongUuTienComponent', () => {
  let component: DoiTuongUuTienComponent;
  let fixture: ComponentFixture<DoiTuongUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoiTuongUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoiTuongUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
