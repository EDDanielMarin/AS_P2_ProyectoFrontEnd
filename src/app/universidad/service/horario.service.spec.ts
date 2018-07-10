import { TestBed, inject } from '@angular/core/testing';

import { HorarioService } from './horario.service';

describe('HorarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorarioService]
    });
  });

  it('should be created', inject([HorarioService], (service: HorarioService) => {
    expect(service).toBeTruthy();
  }));
});
