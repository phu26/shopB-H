import { TestBed } from '@angular/core/testing';

import { XetTuyenService } from './xet-tuyen.service';

describe('XetTuyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XetTuyenService = TestBed.get(XetTuyenService);
    expect(service).toBeTruthy();
  });
});
