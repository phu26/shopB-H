import { TestBed } from '@angular/core/testing';

import { KhaoSatService } from './khao-sat.service';

describe('KhaoSatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KhaoSatService = TestBed.get(KhaoSatService);
    expect(service).toBeTruthy();
  });
});
