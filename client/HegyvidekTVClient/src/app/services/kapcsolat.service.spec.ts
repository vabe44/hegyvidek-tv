import { TestBed, inject } from '@angular/core/testing';

import { KapcsolatService } from './kapcsolat.service';

describe('KapcsolatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KapcsolatService]
    });
  });

  it('should be created', inject([KapcsolatService], (service: KapcsolatService) => {
    expect(service).toBeTruthy();
  }));
});
