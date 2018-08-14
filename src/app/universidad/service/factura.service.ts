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
    return this.dto.ejecutaPut("https://modulofactarqui.herokuapp.com/facturas",data)
  }
  obtenerNumeroFactura()
  {
    return this.dto.ejecutaGet("https://modulofactarqui.herokuapp.com/facturas/numero");
  }

  obtenerFactura(param)
  {
    return this.dto.ejecutaGet("https://modulofactarqui.herokuapp.com/facturas/buscar/"+param);
  }
  
  actualizarFactura(data)
  {
    return this.dto.ejecutaPost("https://modulofactarqui.herokuapp.com/facturas",data);
  }
  obtenerFacturas()
  {
    return this.dto.ejecutaGet("https://modulofactarqui.herokuapp.com/facturas");
  }
}
