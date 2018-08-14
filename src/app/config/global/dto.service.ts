import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { urlUser } from '../url';
import { Message } from 'primeng/primeng';
import { AlertService } from './alert.service';
import angular = require('../../../../node_modules/@types/angular');
//import * as angular from 'angular';

@Injectable({
  providedIn: 'root'
})
export class DtoService {
  msgs: Message[] = [];


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }
    )
  };

  private httpOptionsMulti = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    }
    )
  };

  private httpOptionsOct = {
    headers: new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    })
  };

  
  constructor(private _http: HttpClient, private alertService: AlertService) { }

  ejecutaPost(url, data): Observable<any> {
    let options = { headers: this.httpOptions, }
    return this._http.post<any>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ejecutaPostMulti(url, data): Observable<any> {
    let options = { headers: { 'Content-Type': undefined }}//,  transformRequest: angular.identity
    return this._http.post<any>(url, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  ejecutaGet(url): Observable<any> {
    return this._http.get<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ejecutaGetOct(url): Observable<Blob> {
    return this._http.get(url, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  ejecutaPut(url, data): Observable<any> {
    return this._http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  ejecutaDelete(url, data): Observable<any> {
    var _headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.delete(url, { headers: _headers, params: data });
  }
  ejecutaDelete2(url): Observable<any> {
    var _headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this._http.delete(url);
  }

  ejecutaDeleteId(url): Observable<any> {
    var _headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.delete(url, this.httpOptions);
  }


  obtenerUrl(_modulo: String): Observable<any> {
    let _url = urlUser;
    //console.log(_url);
    return of(_url.find(x => x.modulo === _modulo));
  }
  private handleError(error: HttpErrorResponse) {
    var resp: any;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      // console.error('Error', error.error.message);
      resp = { estado: "Error", mensaje: error.error.message, codigo: "500" }
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      resp = { estado: "Error del Backend ", mensaje: error.error, codigo: error.status }


    }
    // return an observable with a user-facing error message
    return throwError(resp);

  };


  /**Fija mensaje de respuesta resultado de ejecucion de una peticion al core. */
  public manejoError(resp: any) {
    if (resp !== null && resp.headers !== undefined) {
      //sessionStorage.setItem('jwt', resp.headers['_headers'].get('x-auth-token'));
    }
    let mensaje = 'ERROR DE CONEXIÓN CON EL SERVIDOR';
    if (resp.message !== undefined && resp.message !== null) {
      mensaje = resp.message;
    }
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: mensaje, detail: '' });
    //this.alertService.mostrarMensaje(this.msgs);
  }

  /**Fija mensaje de respuesta resultado de ejecucion de una peticion al core. */
  public mostrarMensaje(msgs: Message[], persistirmsg = false, acumular = false) {
    if (!acumular) {
      this.msgs = msgs;
    } else {
      this.msgs = this.msgs.concat(msgs);
    }
    // this.msgs = msgs;
    // this.alertService.mostrarMensaje(this.msgs, persistirmsg);
  }

}
