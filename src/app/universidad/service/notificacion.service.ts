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
  constructor(private dto: DtoService) {

  }
  enviarNotificacion(data) {
    return this.dto.ejecutaPost(this.url.concat("notificaciones"), data);
  }

  enviarNotificacionSMS(data) {
    return this.dto.ejecutaPost(this.url.concat("notificaciones/sms"), data);
  }

  obtenerPlantilla() {
    return this.dto.ejecutaGet(this.url.concat("plantillas"));
  }

  guardarPlantilla(data) {
    return this.dto.ejecutaPut(this.url.concat("plantillas"), data)

  }
  modificarPlantilla(data) {
    return this.dto.ejecutaPost(this.url.concat("plantillas"), data)

  }
  eliminarPlantilla(param) {
    return this.dto.ejecutaDeleteId(this.url.concat("plantillas/", param))

  }
  obtenerNotificaciones(param)
  {
   return this.dto.ejecutaGet(this.url.concat("notificaciones/receptor/",param))
  }
  obtenerMedios() {
    return this.dto.ejecutaGet(this.url.concat("medios"));
  }
  guardarMedios(data) {
    return this.dto.ejecutaPut(this.url.concat("medios"), data)
  }
  modificarMedios(data) {
    return this.dto.ejecutaPost(this.url.concat("medios"), data)
  }
  eliminarMedios(param) {
    return this.dto.ejecutaDeleteId(this.url.concat("medios/", param))
  }
}
