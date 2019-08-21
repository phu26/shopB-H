import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnuComponent } from './qnu.component';

describe('QnuComponent', () => {
  let component: QnuComponent;
  let fixture: ComponentFixture<QnuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
