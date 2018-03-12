import { TestBed, inject } from '@angular/core/testing';

import { HirService } from './hir.service';

describe('HirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HirService]
    });
  });

  it('should be created', inject([HirService], (service: HirService) => {
    expect(service).toBeTruthy();
  }));
});
