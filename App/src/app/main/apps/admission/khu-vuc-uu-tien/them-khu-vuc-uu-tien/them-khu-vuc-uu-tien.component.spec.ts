import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemKhuVucUuTienComponent } from './them-khu-vuc-uu-tien.component';

describe('ThemKhuVucUuTienComponent', () => {
  let component: ThemKhuVucUuTienComponent;
  let fixture: ComponentFixture<ThemKhuVucUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemKhuVucUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemKhuVucUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
