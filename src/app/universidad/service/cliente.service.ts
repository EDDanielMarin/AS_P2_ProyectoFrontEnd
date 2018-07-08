import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url:String;
  constructor(private dto:DtoService) { 

    
  }
  private obtenerUrl()
  {
    this.dto.obtenerUrl("facturacion").subscribe(
      (resp:any)=>
      {
        console.log(resp)
        this.url=resp.url;
      }

    );
  }

  obtenerclientes()
  {
   // return this.dto.ejecutaGet(this.url+"clientes");
   return this.dto.ejecutaGet("http://40.121.33.183:3000/clientes");
  }

  guardar(data)
  {
    return this.dto.ejecutaPut("http://40.121.33.183:3000/clientes",data);
  }

  actualizar(data)
  {
    return this.dto.ejecutaPost("http://40.121.33.183:3000/clientes",data);
  }
  eliminar(data)
  {
    return this.dto.ejecutaDelete("http://40.121.33.183:3000/clientes",data);
  }
}
