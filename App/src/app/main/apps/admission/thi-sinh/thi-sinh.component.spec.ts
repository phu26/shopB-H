import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiSinhComponent } from './thi-sinh.component';

describe('ThiSinhComponent', () => {
  let component: ThiSinhComponent;
  let fixture: ComponentFixture<ThiSinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiSinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
