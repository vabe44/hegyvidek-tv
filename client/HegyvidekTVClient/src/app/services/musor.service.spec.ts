import { TestBed, inject } from '@angular/core/testing';

import { MusorService } from './musor.service';

describe('MusorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusorService]
    });
  });

  it('should be created', inject([MusorService], (service: MusorService) => {
    expect(service).toBeTruthy();
  }));
});
