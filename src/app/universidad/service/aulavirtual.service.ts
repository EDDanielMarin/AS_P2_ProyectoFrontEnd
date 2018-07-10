import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class AulavirtualService {

  constructor(private dto: DtoService) { }
}
