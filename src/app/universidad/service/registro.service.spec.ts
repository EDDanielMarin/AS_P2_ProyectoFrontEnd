import { TestBed, inject } from '@angular/core/testing';

import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroService]
    });
  });

  it('should be created', inject([RegistroService], (service: RegistroService) => {
    expect(service).toBeTruthy();
  }));
});
