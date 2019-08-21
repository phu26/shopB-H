import { TestBed } from '@angular/core/testing';

import { LoadingProcessesService } from './loading-processes.service';

describe('LoadingProcessesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingProcessesService = TestBed.get(LoadingProcessesService);
    expect(service).toBeTruthy();
  });
});
