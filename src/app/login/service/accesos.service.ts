import { Injectable } from '@angular/core';
import { DtoService } from "../../config/global/dto.service"

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private dto:DtoService) { }
  private url: String;
  
  obtenerURL() {
    this.dto.obtenerUrl("seguridades").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }
  guardarAcceso(data)
  {
    return this.dto.ejecutaPut(this.url.concat("SegRegistroAcceso/nuevo"),data);
  }
  obtenerAccesos()
  {
    return this.dto.ejecutaGet(this.url.concat("SegRegistroAcceso/buscar/todos"));
  }
}
