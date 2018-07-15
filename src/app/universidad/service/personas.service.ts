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
    return this.dto.ejecutaGet(this.url.concat(cedula));
  }
}
