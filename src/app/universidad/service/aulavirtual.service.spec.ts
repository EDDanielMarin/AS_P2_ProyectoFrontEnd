import { TestBed, inject } from '@angular/core/testing';

import { AulavirtualService } from './aulavirtual.service';

describe('AulavirtualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AulavirtualService]
    });
  });

  it('should be created', inject([AulavirtualService], (service: AulavirtualService) => {
    expect(service).toBeTruthy();
  }));
});
