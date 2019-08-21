import { TestBed } from '@angular/core/testing';

import { HinhThucXetTuyenService } from './hinh-thuc-xet-tuyen.service';

describe('HinhThucXetTuyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HinhThucXetTuyenService = TestBed.get(HinhThucXetTuyenService);
    expect(service).toBeTruthy();
  });
});
