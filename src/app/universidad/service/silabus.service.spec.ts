import { TestBed, inject } from '@angular/core/testing';

import { SilabusService } from './silabus.service';

describe('SilabusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SilabusService]
    });
  });

  it('should be created', inject([SilabusService], (service: SilabusService) => {
    expect(service).toBeTruthy();
  }));
});
