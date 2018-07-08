import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private dto:DtoService) { }

  guardarResgistro(data:any)
  {
    return this.dto.ejecutaPut("http://40.121.33.183:3000/facturas",data)
  }
  obtenerNumeroFactura()
  {
    return this.dto.ejecutaGet("http://40.121.33.183:3000/facturas/numero");
  }
}
