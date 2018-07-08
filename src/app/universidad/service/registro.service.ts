import { Injectable } from '@angular/core';
import { DtoService } from "../../config/global/dto.service"
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private dto:DtoService) { }
  private url:string="http://130.211.138.144/modulo-seguridades-web/webresources/SegUsuario/nuevo";

  guardarUsuario(data)
  {
    return this.dto.ejecutaPost(this.url,data);

  }
  obtenerPerfiles()
  {
   // return this.dto.e
  }
  obtenerUsuarios()
  {
    return this.dto.ejecutaGet("http://130.211.138.144/modulo-seguridades-web/webresources/SegPerfil/buscar/todos");
  }

}
