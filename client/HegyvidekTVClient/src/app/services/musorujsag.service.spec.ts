import { TestBed, inject } from '@angular/core/testing';

import { MusorujsagService } from './musorujsag.service';

describe('MusorujsagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusorujsagService]
    });
  });

  it('should be created', inject([MusorujsagService], (service: MusorujsagService) => {
    expect(service).toBeTruthy();
  }));
});
