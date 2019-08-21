import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSignalrComponent } from './loading-signalr.component';

describe('LoadingSignalrComponent', () => {
  let component: LoadingSignalrComponent;
  let fixture: ComponentFixture<LoadingSignalrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSignalrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSignalrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
