import { TestBed } from '@angular/core/testing';

import { KhuVucUuTienService } from './khu-vuc-uu-tien.service';

describe('KhuVucUuTienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KhuVucUuTienService = TestBed.get(KhuVucUuTienService);
    expect(service).toBeTruthy();
  });
});
