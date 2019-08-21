import { TestBed } from '@angular/core/testing';

import { HoSoXetTuyenService } from './ho-so-xet-tuyen.service';

describe('HoSoXetTuyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoSoXetTuyenService = TestBed.get(HoSoXetTuyenService);
    expect(service).toBeTruthy();
  });
});
