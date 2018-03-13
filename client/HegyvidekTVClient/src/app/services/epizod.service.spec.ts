import { TestBed, inject } from '@angular/core/testing';

import { EpizodService } from './epizod.service';

describe('EpizodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpizodService]
    });
  });

  it('should be created', inject([EpizodService], (service: EpizodService) => {
    expect(service).toBeTruthy();
  }));
});
