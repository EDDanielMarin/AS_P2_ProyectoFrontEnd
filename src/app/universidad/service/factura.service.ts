import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private dto:DtoService) { }

  guardarResgistro(data:any)
  {
    data.total=0;
    data.detalles.forEach(x=>{
      data.total+=x.precio;
    })
    return this.dto.ejecutaPut("http://40.121.33.183:3000/facturas",data)
  }
  obtenerNumeroFactura()
  {
    return this.dto.ejecutaGet("http://40.121.33.183:3000/facturas/numero");
  }

  obtenerFactura(param)
  {
    return this.dto.ejecutaGet("http://40.121.33.183:3000/facturas/buscar/"+param);
  }
  
  actualizarFactura(data)
  {
    return this.dto.ejecutaPost("http://40.121.33.183:3000/facturas",data);
  }
  obtenerFacturas()
  {
    return this.dto.ejecutaGet("http://40.121.33.183:3000/facturas");
  }
}
