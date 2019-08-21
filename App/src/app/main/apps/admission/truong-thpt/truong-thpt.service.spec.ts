import { TestBed } from '@angular/core/testing';

import { TruongThptService } from './truong-thpt.service';

describe('TruongThptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TruongThptService = TestBed.get(TruongThptService);
    expect(service).toBeTruthy();
  });
});
