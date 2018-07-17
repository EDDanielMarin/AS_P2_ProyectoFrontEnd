import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private dto:DtoService) { }
  
  obtenerTareasCurso(curso)
  {
    return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/Tarea/"+curso);
  }
  guardarTarea(data:any)
  {
    return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/Tarea/",data)
  }
  actualizarTarea(data)
  {
    console.log("Post");
    return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/Tarea/",data);
  }
  eliminarTarea(data)
  {
    return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/Tarea/"+data);
  }
}
