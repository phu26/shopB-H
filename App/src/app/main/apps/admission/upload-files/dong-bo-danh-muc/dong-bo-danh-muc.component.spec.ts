import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongBoDanhMucComponent } from './dong-bo-danh-muc.component';

describe('DongBoUISDialogComponent', () => {
  let component: DongBoDanhMucComponent;
  let fixture: ComponentFixture<DongBoDanhMucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongBoDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongBoDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
