import { Injectable } from '@angular/core';
//import {ConfigService} from '../../config/config.service';
import {DtoService} from '../../config/global/dto.service';
import {userMenu} from '../../config/userMenu';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class LoginService {

  private url:string;

  constructor(private dto: DtoService) {
    this.dto.obtenerUrl("seguridades").subscribe(
      (resp:any)=>
      {
        this.url=resp.url;
      }
    );
   }
   inicioSesion(user:String, pass:String)
   {
       var data={usuario:user,clave:pass};
       return this.dto.ejecutaPost(this.url+"Login/login",data);
   }
   buscaMenu(rol:String):Observable<any>
   {
      let b=userMenu;
      return of(b.find(x=> x.rol==rol));
    
   }
   public mensaje(as)
   {
      this.dto.mostrarMensaje(as);
   }

   
}
