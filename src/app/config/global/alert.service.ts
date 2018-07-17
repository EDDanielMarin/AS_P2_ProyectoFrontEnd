import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Message} from 'primeng/primeng';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Message[]>();

  /**
   * Formato del mensaje: {mostrar:true, msg:""}
   */
  private muestraAlerta = new Subject <any>();
  private keepAfterNavigationChange = false;
  constructor(private router: Router) {
     // clear alert message on route change
     router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
              // only keep for a single location change
              this.keepAfterNavigationChange = false;
          } else {
              // clear alert
              this.subject.next();
              this.muestraAlerta.next({mostrar: false, msg: ''});
          }
      }
  });

   }



  mostrarMensaje(messages: Message[], pKeepAfterNavigationChange = false) {
    if (messages.length <= 0 || messages[0].severity === undefined) {
      // return;
      // Este return no va, para que limpie el mensaje previo, ejemplo en una consulta da error y la proxima consulta ya no tiene error
      // tiene encerar el mensaje.
    }
    this.keepAfterNavigationChange = pKeepAfterNavigationChange;
    this.subject.next(messages);
}

mostrarAlerta(mensaje, logout = false) {
  this.muestraAlerta.next({mostrar: !logout, mostrarlogout: logout, msg: mensaje});
}



obtenerMensaje(): Observable<any> {
    return this.subject.asObservable();
}

obtenerMuestraAlerta(): Observable<any> {
    return this.muestraAlerta.asObservable();
}

}
