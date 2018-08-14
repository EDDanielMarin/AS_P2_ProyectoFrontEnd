import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TareaService } from '../../service/tarea.service';
import { PeriodoService } from '../../../universidad/service/periodo.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  constructor(private servicio: TareaService, private location: Location,private servicioPeriodo:PeriodoService) { }

  tareas: any = [];
  tareaSeleccionado: any;
  cols: any[];
  usuario: any;
  curso:any;
  selectCurso:any;
  nrcs:any;
  private tarea: any = {};
  private entregas: boolean = false;
  private enviarTarea:any={};
  ngOnInit() {
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'curso', header: 'Curso' },
      { field: 'tema', header: 'Tema' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'fechaInicio', header: 'Fecha Inicial' },
      { field: 'fechaFin', header: 'Fecha Final' },
    ];
    this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario.perfil=="DOC")
    {
      var codigo_persona={
        "codPeriodo":"201801",
        "codPersona":"L00357199"
      };  
      this.servicioPeriodo.obtenerNrcPorDocente(codigo_persona).subscribe(
        (resp:any)=>{           
          this.nrcs=resp;  
          console.log(resp);
        },
        (error)=>{

        }

      );
    }else{
      var codigo_persona2={
        "codPeriodo":"201801",
        "codPersona":"0503910903"
      };
      this.servicioPeriodo.obtenerNrcAlumno(codigo_persona2).subscribe(
        (resp:any)=>{           
          this.nrcs=resp[0].detalleMatricula;  
          console.log(resp);
          console.log(this.nrcs);
        },
        (error)=>{

        }

      );
      }
      console.log(this.nrcs);

  }
  buscarCurso(){
    //alert(this.curso);
    this.selectCurso=true;
    this.servicio.obtenerTareasCurso(this.curso).subscribe(
      (resp: any) => {

        console.log(resp);
        this.tareas = resp;

      },
      (error) => {

      }

    );
  }
  selectUsuario() {
    if (this.usuario.perfil == "DOC")
      return true;
    else
      return false;
  }
  seleccionarTarea(){
    location.href="/#/virtual/entregaTarea";
  }
  verEntregas(reg:any){
    this.enviarTarea=reg;
    this.entregas=true;
  }
  guardarTarea() {
    console.log(this.tarea);
    if (this.tarea.codigo) {
      console.log("Actualizar " + this.tarea.fechaInicio);
      this.tarea.id = undefined;
      this.servicio.actualizarTarea(this.tarea).subscribe(
        (resp: any) => {
          console.log(resp);
        }

      )

    } else {
      this.tarea.fechaInicio = new Date();
      this.tarea.fechaFin = new Date();
      this.tarea.curso = this.curso;
      this.servicio.guardarTarea(this.tarea).subscribe(
        (resp: any) => {
          console.log(resp);
        }
      );
    }
    location.reload();
  }
  editarTarea(reg: any) {
    this.tarea = reg;
    //location.reload();
  }
  eliminarTarea(reg: any) {
    var _data = { tarea: parseInt(reg.codigo) };
    //alert(reg.codigo);
    this.servicio.eliminarTarea(reg.codigo).subscribe(
      (resp: any) => {
        console.log(resp);
      }
    );
    location.reload();
  }
  convertirTimeStamp(timpestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timpestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }


}
