import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingProcessesComponent } from './loading-processes.component';

describe('LoadingProcessesComponent', () => {
  let component: LoadingProcessesComponent;
  let fixture: ComponentFixture<LoadingProcessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingProcessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
