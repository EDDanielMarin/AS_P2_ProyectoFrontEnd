import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class FranjaService {

  constructor(private dto:DtoService) { }
  
  obtenerFranjas()
  {
    return this.dto.ejecutaGet("http://localhost:8084/EspaciosFisicos-web/servicios/franja");
  }

}

