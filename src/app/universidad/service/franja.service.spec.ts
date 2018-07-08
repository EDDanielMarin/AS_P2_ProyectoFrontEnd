import { TestBed, inject } from '@angular/core/testing';

import { FranjaService } from './franja.service';

describe('FranjaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FranjaService]
    });
  });

  it('should be created', inject([FranjaService], (service: FranjaService) => {
    expect(service).toBeTruthy();
  }));
});
