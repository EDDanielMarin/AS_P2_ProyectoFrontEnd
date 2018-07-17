import { TestBed, inject } from '@angular/core/testing';

import { EvaluacionDocenteService } from './evaluacion-docente.service';

describe('EvaluacionDocenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluacionDocenteService]
    });
  });

  it('should be created', inject([EvaluacionDocenteService], (service: EvaluacionDocenteService) => {
    expect(service).toBeTruthy();
  }));
});
