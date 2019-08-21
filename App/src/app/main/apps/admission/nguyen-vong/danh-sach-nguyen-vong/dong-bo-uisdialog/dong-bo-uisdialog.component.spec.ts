import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongBoUISDialogComponent } from './dong-bo-uisdialog.component';

describe('DongBoUISDialogComponent', () => {
  let component: DongBoUISDialogComponent;
  let fixture: ComponentFixture<DongBoUISDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongBoUISDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongBoUISDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
