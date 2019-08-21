import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NganhDaoTaoComponent } from './nganh-dao-tao.component';

describe('NganhDaoTaoComponent', () => {
  let component: NganhDaoTaoComponent;
  let fixture: ComponentFixture<NganhDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NganhDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NganhDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
