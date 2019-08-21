import { TestBed } from '@angular/core/testing';

import { DotTuyenSinhService } from './dot-tuyen-sinh.service';

describe('DotTuyenSinhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DotTuyenSinhService = TestBed.get(DotTuyenSinhService);
    expect(service).toBeTruthy();
  });
});
