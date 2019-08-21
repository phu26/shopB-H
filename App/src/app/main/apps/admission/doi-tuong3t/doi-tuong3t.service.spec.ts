import { TestBed } from '@angular/core/testing';

import { DoiTuong3tService } from './doi-tuong3t.service';

describe('DoiTuong3tService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoiTuong3tService = TestBed.get(DoiTuong3tService);
    expect(service).toBeTruthy();
  });
});
