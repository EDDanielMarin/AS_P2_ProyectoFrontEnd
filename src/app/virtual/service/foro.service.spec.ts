import { TestBed, inject } from '@angular/core/testing';

import { ForoService } from './foro.service';

describe('ForoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForoService]
    });
  });

  it('should be created', inject([ForoService], (service: ForoService) => {
    expect(service).toBeTruthy();
  }));
});
