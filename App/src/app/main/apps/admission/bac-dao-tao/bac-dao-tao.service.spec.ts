import { TestBed } from '@angular/core/testing';

import { BacDaoTaoService } from './bac-dao-tao.service';

describe('BacDaoTaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacDaoTaoService = TestBed.get(BacDaoTaoService);
    expect(service).toBeTruthy();
  });
});
