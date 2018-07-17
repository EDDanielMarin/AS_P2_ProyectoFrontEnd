import { TestBed, inject } from '@angular/core/testing';

import { NotificacionService } from './notificacion.service';

describe('NotificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionService]
    });
  });

  it('should be created', inject([NotificacionService], (service: NotificacionService) => {
    expect(service).toBeTruthy();
  }));
});
