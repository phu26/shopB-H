import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemNganhDaoTaoComponent } from './them-nganh-dao-tao.component';

describe('ThemNganhDaoTaoComponent', () => {
  let component: ThemNganhDaoTaoComponent;
  let fixture: ComponentFixture<ThemNganhDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemNganhDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemNganhDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
