import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("persona").subscribe(
      (resp: any) => {
        this.url = resp.url;
    }
    );
  }
  constructor(private dto: DtoService) { }


  obtenerPersonas()
  {
    return this.dto.ejecutaGet(this.url)
  }
  obtenerPersonaCedula(cedula)
  {
    // return this.dto.ejecutaGet(this.url.concat(cedula));
    return this.dto.ejecutaGet("http://35.229.42.61:3000/personas/"+cedula);
  }

  guardar(data)
  {
    return this.dto.ejecutaPut(this.url, data)
  }
  modificar(data)
  {
    return this.dto.ejecutaPost(this.url, data)

  }
}
