import { TestBed, inject } from '@angular/core/testing';

import { DtoService } from './dto.service';

describe('DtoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DtoService]
    });
  });

  it('should be created', inject([DtoService], (service: DtoService) => {
    expect(service).toBeTruthy();
  }));
});
