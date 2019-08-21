import { TestBed } from '@angular/core/testing';

import { DoiTuongUuTienService } from './doi-tuong-uu-tien.service';

describe('DoiTuongUuTienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoiTuongUuTienService = TestBed.get(DoiTuongUuTienService);
    expect(service).toBeTruthy();
  });
});
