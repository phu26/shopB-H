import { TestBed } from '@angular/core/testing';

import { ThongBaoNgoaiService } from './thong-bao-ngoai.service';

describe('ThongBaoNgoaiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThongBaoNgoaiService = TestBed.get(ThongBaoNgoaiService);
    expect(service).toBeTruthy();
  });
});
