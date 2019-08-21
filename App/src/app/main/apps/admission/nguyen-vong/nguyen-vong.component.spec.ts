import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NguyenVongComponent } from './nguyen-vong.component';

describe('NguyenVongComponent', () => {
  let component: NguyenVongComponent;
  let fixture: ComponentFixture<NguyenVongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguyenVongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NguyenVongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
