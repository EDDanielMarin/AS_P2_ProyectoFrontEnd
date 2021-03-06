import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private dto: DtoService) { }
  
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("espacios").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }

  obtenerCampus(param) {
    
    return this.dto.ejecutaGet(this.url.concat("ubicacion/filtro/",param));
  }
  guardar(data)
  {
    return  this.dto.ejecutaPut(this.url.concat("ubicacion"),data);
  }
  eliminar(param)
  {
    return this.dto.ejecutaDeleteId(this.url.concat("ubicacion/",param));
  }
  modificar(data)
  {
    console.log(data);
    return this.dto.ejecutaPost(this.url.concat("ubicacion"),data);

  }

}
