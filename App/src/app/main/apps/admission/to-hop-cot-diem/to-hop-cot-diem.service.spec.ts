import { TestBed } from '@angular/core/testing';

import { ToHopCotDiemService } from './to-hop-cot-diem.service';

describe('ToHopCotDiemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToHopCotDiemService = TestBed.get(ToHopCotDiemService);
    expect(service).toBeTruthy();
  });
});
