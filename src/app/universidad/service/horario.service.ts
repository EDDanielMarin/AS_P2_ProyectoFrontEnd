import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("espacios").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }
  constructor(private dto: DtoService) { }


  obtenerhorarioNrc(nrc: string)
  {
    return this.dto.ejecutaGet((this.url.concat("horario/",nrc)))
  }
  guardarHorarioNrc(data:any[])
  {
    return this.dto.ejecutaPut(this.url.concat("horario/"),data);
  }
}
