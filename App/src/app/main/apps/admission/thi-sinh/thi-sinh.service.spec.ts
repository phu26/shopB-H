import { TestBed } from '@angular/core/testing';

import { ThiSinhService } from './thi-sinh.service';

describe('ThiSinhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThiSinhService = TestBed.get(ThiSinhService);
    expect(service).toBeTruthy();
  });
});
