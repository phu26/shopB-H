import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingProcessesExpandComponent } from './loading-processes-expand.component';

describe('LoadingProcessesExpandComponent', () => {
  let component: LoadingProcessesExpandComponent;
  let fixture: ComponentFixture<LoadingProcessesExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingProcessesExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingProcessesExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
