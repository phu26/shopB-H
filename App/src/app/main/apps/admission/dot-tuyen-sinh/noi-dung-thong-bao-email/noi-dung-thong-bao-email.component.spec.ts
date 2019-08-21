import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiDungThongBaoEmailComponent } from './noi-dung-thong-bao-email.component';

describe('NoiDungThongBaoEmailComponent', () => {
  let component: NoiDungThongBaoEmailComponent;
  let fixture: ComponentFixture<NoiDungThongBaoEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoiDungThongBaoEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiDungThongBaoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
