import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDoiTuongUuTienComponent } from './them-doi-tuong-uu-tien.component';

describe('ThemDoiTuongUuTienComponent', () => {
  let component: ThemDoiTuongUuTienComponent;
  let fixture: ComponentFixture<ThemDoiTuongUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemDoiTuongUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemDoiTuongUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
