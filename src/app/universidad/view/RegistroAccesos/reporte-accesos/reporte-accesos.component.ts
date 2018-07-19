import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../../../../login/service/accesos.service';

@Component({
  selector: 'app-reporte-accesos',
  templateUrl: './reporte-accesos.component.html',
  styleUrls: ['./reporte-accesos.component.css']
})
export class ReporteAccesosComponent implements OnInit {

  constructor(private servicio: AccesoService) { }
 
  accesos:any[];

  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(),10);
    this.servicio.obtenerAccesos().subscribe(
      (resp:any)=>
      {
        this.accesos=resp;
        console.log(this.accesos);
        
      }
    )

  }

}
