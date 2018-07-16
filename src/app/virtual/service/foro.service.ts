import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private dto:DtoService) { }

  obtenerForosCurso(curso)
  {
    return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/Foros/"+curso);
  }
  guardarForo(data:any)
  {
    return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/Foros/",data)
  }
  actualizarForo(data)
  {
    return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/Foros/",data);
  }
  eliminarForo(data)
  {
    return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/Foros/"+data);
  }

  obtenerForosAlumno(foro)
  {
    return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/ForoAlumno/"+foro);
  }
  guardarForoAlumno(data:any)
  {
    return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/ForoAlumno/",data)
  }
  actualizarForoAlumno(data)
  {
    return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/ForoAlumno/",data);
  }
  eliminarForoAlumno(data)
  {
    return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/ForoAlumno/"+data);
  }
}
