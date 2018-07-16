import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("periodo").subscribe(
      (resp: any) => {
        this.url = resp.url;
      }
    );
  }

  constructor(private dto: DtoService) { }

  obtenerPeriodos()
  {
      return this.dto.ejecutaGet(this.url.concat("periodolectivo/listarPeriodos"));
  }
  obtenerNrcPorPeriodo(data:any)
  {
      return this.dto.ejecutaPost(this.url.concat("nrc/listarNrcPorPeriodo"),data);
  }

  obtenerNrcPorDocente(data:any)
  {
    return this.dto.ejecutaPost(this.url.concat("nrc/listarNrcPorDocente"),data);

  }
  generarNrc(data:any)
  {
    return this.dto.ejecutaPut(this.url.concat("nrc/generarNrc"),data);

  }
  asignarDocente(data:any)
  {
    return this.dto.ejecutaPost(this.url.concat("nrc/asignarDocenteNrc"),data);
  }
  obtenerNrcAlumno(data:any)
  {
    return this.dto.ejecutaPost(this.url.concat("matricula/listarNrcEstudiante"),data);
  }
  guardarMaticula(data:any)
  {
    return this.dto.ejecutaPut(this.url.concat("matricula/matriculacion"),data);
  }
  
}
