import { TestBed } from '@angular/core/testing';

import { QuanHuyenService } from './quan-huyen.service';

describe('QuanHuyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuanHuyenService = TestBed.get(QuanHuyenService);
    expect(service).toBeTruthy();
  });
});
