import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YersinComponent } from './yersin.component';

describe('YersinComponent', () => {
  let component: YersinComponent;
  let fixture: ComponentFixture<YersinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YersinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YersinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
