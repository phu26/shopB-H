import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongBaoNgoaiComponent } from './thong-bao-ngoai.component';

describe('ThongBaoNgoaiComponent', () => {
  let component: ThongBaoNgoaiComponent;
  let fixture: ComponentFixture<ThongBaoNgoaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongBaoNgoaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongBaoNgoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
