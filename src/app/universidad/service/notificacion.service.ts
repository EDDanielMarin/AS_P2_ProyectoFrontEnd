import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("notificacion").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }
  constructor(private dto:DtoService) { 

  }
  obtenerPlantilla()
  {
    return this.dto.ejecutaGet(this.url.concat("plantillas"));
  }

  guardarPlantilla(data)
  {
    return this.dto.ejecutaPut(this.url.concat("plantillas"),data)

  }
  modificarPlantilla(data)
  {
    return this.dto.ejecutaPost(this.url.concat("plantillas"),data)

  }
  eliminarPlantilla(param)
  {
    return this.dto.ejecutaDeleteId(this.url.concat("plantillas/",param))

  }
}
