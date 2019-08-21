import { TestBed } from '@angular/core/testing';

import { HeDaoTaoService } from './he-dao-tao.service';

describe('HeDaoTaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeDaoTaoService = TestBed.get(HeDaoTaoService);
    expect(service).toBeTruthy();
  });
});
