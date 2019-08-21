import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruongTHPTComponent } from './truong-thpt.component';

describe('TruongTHPTComponent', () => {
  let component: TruongTHPTComponent;
  let fixture: ComponentFixture<TruongTHPTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruongTHPTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruongTHPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
