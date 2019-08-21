import { TestBed } from '@angular/core/testing';

import { DanhTocService } from './danh-toc.service';

describe('DanhTocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DanhTocService = TestBed.get(DanhTocService);
    expect(service).toBeTruthy();
  });
});
