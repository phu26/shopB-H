import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiSinhItemComponent } from './thi-sinh-item.component';

describe('ThiSinhItemComponent', () => {
  let component: ThiSinhItemComponent;
  let fixture: ComponentFixture<ThiSinhItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiSinhItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiSinhItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
