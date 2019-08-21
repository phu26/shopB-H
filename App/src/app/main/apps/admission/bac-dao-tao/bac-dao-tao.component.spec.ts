import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacDaoTaoComponent } from './bac-dao-tao.component';

describe('BacDaoTaoComponent', () => {
  let component: BacDaoTaoComponent;
  let fixture: ComponentFixture<BacDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
