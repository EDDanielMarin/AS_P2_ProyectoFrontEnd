import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class FranjaService {

  constructor(private dto:DtoService) { }
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("espacios").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }

  obtenerFranjas()
  {
    return this.dto.ejecutaGet(this.url.concat("franja"));
  }

  obtenerPorHorario(data)
  {
    return this.dto.ejecutaPost(this.url.concat("franja"),data);
  }
  obtenerFranjasDia(dia)
  {
    return this.dto.ejecutaGet(this.url.concat("franja/dia/",dia));

  }

}

