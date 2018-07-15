import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private dto:DtoService) { }
  
  obtenerAnunciosCurso(curso)
  {
    return this.dto.ejecutaGet("http://35.197.102.72/aula-virtual-web/webresources/Anuncios/"+curso);
  }
  guardarAnuncio(data:any)
  {
    return this.dto.ejecutaPut("http://35.197.102.72/aula-virtual-web/webresources/Anuncios/",data)
  }
  actualizarAnuncio(data)
  {
    console.log("Post");
    return this.dto.ejecutaPost("http://35.197.102.72/aula-virtual-web/webresources/Anuncios/",data);
  }
  eliminarAnuncio(data)
  {
    return this.dto.ejecutaDelete2("http://35.197.102.72/aula-virtual-web/webresources/Anuncios/"+data);
  }
}
