import { Injectable } from '@angular/core';
import { DtoService } from "../../config/global/dto.service"
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

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



  guardarUsuario(data)
  {
    return this.dto.ejecutaPut(this.url.concat("SegUsuario/nuevo"),data);

  }
  obtenerPerfiles()
  {
    return this.dto.ejecutaGet(this.url.concat("SegPerfil/buscar/todos"));
  }
  obtenerUsuarios()
  {
    return this.dto.ejecutaGet(this.url.concat("SegUsuario/buscar/todos"));
  }
  obtenerUsuarioPersona(param)
  {
    return this.dto.ejecutaGet(this.url.concat("SegUsuario/buscar/codpersona/",param))
  }

  modificar(data)
  {

    return this.dto.ejecutaPost(this.url.concat("SegUsuario/actualizar"),data);

  }
  eliminar(param)
  {
    return this.dto.ejecutaDeleteId(this.url.concat("SegUsuario/eliminar/",param))
  }

}
