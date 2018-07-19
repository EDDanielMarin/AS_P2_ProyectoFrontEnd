import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';


@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private dto:DtoService) { } 
    
    
    obtenerWikiCurso(curso)
    {
      console.log("SIIIIIIII");
      return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/Wiki/"+curso);
    }
    guardarWiki(data:any)
    {
      return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/Wiki/",data)
    }
    actualizarWiki(data)
    {
      console.log("Post");
      return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/Wiki/",data);
    }
    eliminarWiki(data)
    {
      return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/Wiki/"+data);
    }
  
}
