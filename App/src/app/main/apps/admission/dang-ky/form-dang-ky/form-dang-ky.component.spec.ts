import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDangKyComponent } from './form-dang-ky.component';

describe('FormDangKyComponent', () => {
  let component: FormDangKyComponent;
  let fixture: ComponentFixture<FormDangKyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDangKyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
