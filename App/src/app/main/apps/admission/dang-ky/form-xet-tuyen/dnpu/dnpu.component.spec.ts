import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnpuComponent } from './dnpu.component';

describe('DnpuComponent', () => {
  let component: DnpuComponent;
  let fixture: ComponentFixture<DnpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
