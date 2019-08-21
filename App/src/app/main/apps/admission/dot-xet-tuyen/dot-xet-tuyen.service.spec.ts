import { TestBed } from '@angular/core/testing';

import { DotXetTuyenService } from './dot-xet-tuyen.service';

describe('DotXetTuyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DotXetTuyenService = TestBed.get(DotXetTuyenService);
    expect(service).toBeTruthy();
  });
});
