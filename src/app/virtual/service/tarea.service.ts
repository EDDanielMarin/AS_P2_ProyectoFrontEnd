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

  obtenerEntregaTareaCurso(curso, tarea)
  {
    return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/EntregaTarea/"+curso+"/"+tarea);
  }
  guardarEntregaTarea(data:any)
  {
    return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/EntregaTarea/",data)
  }
  actualizarEntregaTarea(data)
  {
    console.log("Post");
    return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/EntregaTarea/",data);
  }
  eliminarEntregaTarea(data)
  {
    return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/EntregaTarea/"+data);
  }

  subirArchivo(data : any)
  {
    var formData = new FormData();
    formData.append('file', JSON.stringify(data));
    return this.dto.ejecutaPostMulti("http://35.197.102.72/AulaVirtual_Upload-Download/rest/upload",formData);
  }
  bajarArchivo(data)
  {
    return this.dto.ejecutaGetOct("http://35.197.102.72/AulaVirtual_Upload-Download/rest/Download/"+data);
  }
}
