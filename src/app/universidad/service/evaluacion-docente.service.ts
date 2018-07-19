import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionDocenteService {

  constructor(private dto: DtoService) { }
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("calificacionDocente").subscribe(
      (resp: any) => {
        this.url = resp.url;
      }
    );
  }
  obtenerPreguntas(param)
  {
    return this.dto.ejecutaGet(this.url.concat("pregunta/",param))
  }
  //guardarRespuestaPregunta(){
  //  return this.dto.ejecutaPost
  //}

  
}
