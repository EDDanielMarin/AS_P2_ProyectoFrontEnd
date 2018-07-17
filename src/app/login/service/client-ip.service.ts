import { Injectable } from '@angular/core';
import { DtoService } from "../../config/global/dto.service"

@Injectable({
  providedIn: 'root'
})
export class GetIpCliente {

  constructor(private dto:DtoService) { }
  private url: String="http://api.ipify.org/?format=json";
  
  getIpAddress()
  {
    return this.dto.ejecutaGet(this.url);
  }
}