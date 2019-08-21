import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTruongThptComponent } from './them-truong-thpt.component';

describe('ThemTruongThptComponent', () => {
  let component: ThemTruongThptComponent;
  let fixture: ComponentFixture<ThemTruongThptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemTruongThptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemTruongThptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
