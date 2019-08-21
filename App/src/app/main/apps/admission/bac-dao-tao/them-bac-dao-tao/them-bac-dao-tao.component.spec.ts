import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemBacDaoTaoComponent } from './them-bac-dao-tao.component';

describe('ThemBacDaoTaoComponent', () => {
  let component: ThemBacDaoTaoComponent;
  let fixture: ComponentFixture<ThemBacDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemBacDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemBacDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
