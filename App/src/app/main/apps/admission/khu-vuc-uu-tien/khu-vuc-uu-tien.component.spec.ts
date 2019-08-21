import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhuVucUuTienComponent } from './khu-vuc-uu-tien.component';

describe('KhuVucUuTienComponent', () => {
  let component: KhuVucUuTienComponent;
  let fixture: ComponentFixture<KhuVucUuTienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhuVucUuTienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhuVucUuTienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
