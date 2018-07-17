import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../service/notificacion.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {

  constructor(private servicio: NotificacionService) { }

  private plantillas:any[];
  private cols:any[];
  private colsVariable:any[];

  private detalleVis:boolean=false;
  private variableList:boolean=false;
  
  private crudVariable:boolean=false;

  private plantilla:any={

  }
  private variable:any={};

  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10)
    this.cargarPlantillas();
    this.colsVariable = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'posicion', header: 'Posicion' }
      ];

      this.cols = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'mensaje', header: 'Mensaje' }
        ];
  }
  cargarPlantillas()
  {
    this.servicio.obtenerPlantilla().subscribe(
      (resp:any)=>
      {
        this.plantillas=resp;
      }
    )
  }
  onRowSelect()
  {
    this.detalleVis=true;
    console.log(this.plantilla);
  }
  nuevaVariable()
  {
    this.crudVariable=true;
  }
  verVariables(e?)
  {
  this.plantilla=e;
   this.variableList=true;
   this.variable={};
   this.crudVariable=false;
  }





}
