import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { urlUser } from '../url';

@Injectable({
  providedIn: 'root'
})
export class DtoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }
  )
  };
  constructor(private _http:HttpClient) { }

  ejecutaPost(url,data):Observable<any>
  {
    let options={headers: this.httpOptions,}
      return this._http.post<any>(url,data,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  ejecutaGet(url): Observable<any> 
  {
    return this._http.get<any>(url,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  ejecutaPut(url,data):Observable<any>
  {
    return this._http.put(url,data,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  ejecutaDelete(url, data):Observable<any>
  {
    var _headers= new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this._http.delete(url,{headers:_headers, params: data});
  }
  ejecutaDelete2(url):Observable<any>
  {
    var _headers= new HttpHeaders({
      'Content-Type':  'multipart/form-data'
    });
    return this._http.delete(url);
  }
  
  ejecutaDeleteId(url):Observable<any>
  {
    var _headers= new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this._http.delete(url,this.httpOptions);
  }
  

  obtenerUrl(_modulo:String):Observable<any>
  {
    let _url=urlUser;
    //console.log(_url);
    return of(_url.find(x=>x.modulo===_modulo));
  }
  private handleError(error: HttpErrorResponse) {
    var resp:any;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      
     // console.error('Error', error.error.message);
      resp={estado:"Error",mensaje:error.error.message,codigo:"500"}
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      resp={estado:"Error del Backend ",mensaje:error.error,codigo: error.status}

    
    }
    // return an observable with a user-facing error message
    return throwError(resp);
    
  };

}
