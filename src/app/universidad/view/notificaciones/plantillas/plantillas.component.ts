import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../service/notificacion.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {

  constructor(private servicio: NotificacionService) { }

  private plantillas: any[];
  private nuevasVariables: any[]=[];
  private medios: any[];
  private cols: any[];
  private cols2: any[];
  private colsVariable: any[];

  private detalleVis: boolean = false;
  private detalleVis2: boolean = false;
  private detalleVis3: boolean = false;
  private detalleVis4: boolean = false;
  private detalleVis5: boolean = false;
  private variableList: boolean = false;
  private cont: number=0 ;
  
  private crudVariable: boolean = false;

  private plantilla: any = {  }
  private nuevaPlantilla: any = {  }
  private nuevaVariablePlantilla: any = {  }
  private medio: any = {  }
  private nuevoMedio: any = {  }
  private variable: any = {};


  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(), 10)
    this.cargarPlantillas();
    this.cargarMedios();
    this.nuevoMedio["nombre"]="";
    this.nuevoMedio["estado"]="";
    this.nuevaPlantilla["nombre"]="";
    this.nuevaPlantilla["estado"]="";
    this.nuevaPlantilla["mensaje"]="";
    this.nuevaPlantilla["variables"]=[];
    this.nuevaVariablePlantilla["nombre"]="";
    this.nuevaVariablePlantilla["posicion"]="";
    this.cont=0;
    this.colsVariable = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'posicion', header: 'Posicion' }
      ];
      this.cols = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'mensaje', header: 'Mensaje' }
        ];
    this.cols2 = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'estado', header: 'Estado' }
    ];
  }
  cargarPlantillas() {
    this.servicio.obtenerPlantilla().subscribe(
      (resp: any) => {
        this.plantillas = resp;
      }
    )
  }
  cargarMedios() {
    this.servicio.obtenerMedios().subscribe(
      (resp: any) => {
        this.medios = resp;
      }
    )
  }
  onRowSelect() {
    this.detalleVis = true;
    console.log(this.plantilla);
  }
  onRowSelect2() {
    this.detalleVis2 = true;
    console.log(this.medio);
  }
  activarNuevoMedio() {
    this.detalleVis3 = true;
    console.log(this.nuevoMedio);
  }
  activarNuevaPlantilla() {
    this.detalleVis4 = true;
    console.log(this.nuevaPlantilla);
  }
  mostrarInsertarVariable() {
    this.detalleVis5 = true;
    console.log(this.nuevaVariablePlantilla);
  }
  nuevaVariable() {
    this.crudVariable = true;
  }
  verVariables(e?) {
    this.plantilla = e;
    this.variableList = true;
    this.variable = {};
    this.crudVariable = false;
  }
  eliminarPlantilla(){
    this.servicio.eliminarPlantilla(this.plantilla["_id"]).subscribe(
      (resp: any) => {
        console.log(resp);
        this.detalleVis=false;
        this.cargarPlantillas();
      }
    )
  }
  eliminarMedio(){
    this.servicio.eliminarMedios(this.medio["_id"]).subscribe(
      (resp: any) => {
        console.log(resp);
        this.detalleVis2=false;
        this.cargarMedios(); 
      }
    )
  }
  modificarPlantilla(){
    this.servicio.modificarPlantilla(this.plantilla).subscribe(
      (resp: any) => {
        console.log(resp);
      }
    )
  }
  modificarMedio(){
    this.servicio.modificarMedios(this.medio).subscribe(
      (resp: any) => {
        console.log(resp);
        this.detalleVis2=false;
        this.cargarMedios();
  }
    )
  }
  insertarMedio(){
    this.servicio.guardarMedios(this.nuevoMedio).subscribe(
      (resp: any) => {
        console.log(resp);
        this.detalleVis3=false;
        this.cargarMedios();
      }
    )
  }

  InsertarVariable(){
    console.log(this.nuevaVariablePlantilla);
    this.nuevasVariables.push(this.nuevaVariablePlantilla);
    this.detalleVis5=false;
  }

  insertarPlantilla(){
    this.nuevaPlantilla["variables"]=this.nuevasVariables;
    this.servicio.guardarPlantilla(this.nuevaPlantilla).subscribe(
      (resp: any) => {
        this.cargarPlantillas();
        this.detalleVis4=false;
        console.log(resp);
      }
    )
  }




}
