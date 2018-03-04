import { TestBed, inject } from '@angular/core/testing';

import { IdojarasService } from './idojaras.service';

describe('IdojarasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdojarasService]
    });
  });

  it('should be created', inject([IdojarasService], (service: IdojarasService) => {
    expect(service).toBeTruthy();
  }));
});
