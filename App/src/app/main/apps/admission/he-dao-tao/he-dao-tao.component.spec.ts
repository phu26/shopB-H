import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeDaoTaoComponent } from './he-dao-tao.component';

describe('HeDaoTaoComponent', () => {
  let component: HeDaoTaoComponent;
  let fixture: ComponentFixture<HeDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
