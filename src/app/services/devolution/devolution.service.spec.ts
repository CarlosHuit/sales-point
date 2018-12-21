import { TestBed } from '@angular/core/testing';

import { DevolutionService } from './devolution.service';

describe('DevolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevolutionService = TestBed.get(DevolutionService);
    expect(service).toBeTruthy();
  });
});
