import { Injectable } from '@angular/core';
import { DtoService } from '../../config/global/dto.service';

@Injectable({
  providedIn: 'root'
})
export class SilabusService {
  private url: String;
  obtenerURL() {
    this.dto.obtenerUrl("silabus").subscribe(
      (resp: any) => {
        //console.log(resp)
        this.url = resp.url;
    }
    );
  }

  constructor(private dto:DtoService) { }
  obtenerSilabus()
  {
    return this.dto.ejecutaGet(this.url.concat("syllabus"));
  }
  
  obtener(param,tabla){
    return this.dto.ejecutaGet(this.url.concat(tabla,"/",param));
  }

  modificar(data,tabla)
  {
    return this.dto.ejecutaPost(this.url.concat(tabla),data)
  }
  guardar(data,tabla)
  {
    return this.dto.ejecutaPut(this.url.concat(tabla),data)
  }
  eliminar(param,tabla)
  {
    return this.dto.ejecutaDeleteId(this.url.concat(tabla,"/",param))
  }
  

}
