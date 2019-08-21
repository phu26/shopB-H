import { TestBed } from '@angular/core/testing';

import { CotDiemToHopCotDiemService } from './cot-diem-to-hop-cot-diem.service';

describe('CotDiemToHopCotDiemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CotDiemToHopCotDiemService = TestBed.get(CotDiemToHopCotDiemService);
    expect(service).toBeTruthy();
  });
});
