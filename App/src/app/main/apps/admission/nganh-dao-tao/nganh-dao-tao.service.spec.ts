import { TestBed } from '@angular/core/testing';

import { NganhDaoTaoService } from './nganh-dao-tao.service';

describe('NganhDaoTaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NganhDaoTaoService = TestBed.get(NganhDaoTaoService);
    expect(service).toBeTruthy();
  });
});
