import { Component, OnInit, Input } from '@angular/core';
import { TareaService } from '../../service/tarea.service';
import { PersonasService } from '../../../universidad/service/personas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-entregaTarea',
  templateUrl: './entregaTarea.component.html',
  styleUrls: ['./entregaTarea.component.css']
})
export class EntregaTareaComponent implements OnInit {
  
  @Input() tareaComponent:any={};


  constructor(private servicio:TareaService, private servicioPersona:PersonasService) { }
  curso:any;
  codigo:any;
  tareaCodigo:any;
  tareas:any=[];
  anuncioSeleccionado:any;
  cols: any[];
  usuario:any;
  private tarea:any={};
  ngOnInit() {
    this.curso=this.tareaComponent['curso'];
    this.codigo=this.tareaComponent['codigo'];
    this.tareaCodigo=this.tareaComponent['tarea'];
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'tarea', header: 'Número de Tarea' },
      { field: 'estudiante', header: 'Nombre' },
      { field: 'curso', header: 'Curso' },
      { field: 'texto', header: 'Texto' },
      { field: 'archivo', header: 'Archivo' },
      { field: 'fechaEnvio', header: 'Fecha de envio' },
      { field: 'calificacion', header: 'Calificacion' },
      { field: 'observacion', header: 'Observacion' },
      
  ];
    this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
    console.log(this.usuario);
    this.getEntregas();
    
  }
  getEntregas(){
    this.servicio.obtenerEntregaTareaCurso(this.curso, this.codigo).subscribe(
      (resp:any)=>{
          this.tareas=resp;
          for(var i=0;i<this.tareas.length;i++)
            this.getNombres(i);
            
      },
      (error)=>{

      }
      
    );
    
  }
  getNombres(i){
    // for(var i=0;i<this.foros.length;i++)
      this.servicioPersona.obtenerPersonaCedula(this.tareas[i].alumno).subscribe(
      (resp1:any)=>{
          this.tareas[i]['nombrePersona']=resp1[0].NOMBRE+" "+resp1[0].APELLIDO;
          console.log(this.tareas[i].nombrePersona);
          console.log(resp1[0].NOMBRE+" "+resp1[0].APELLIDO);
      },
      (error)=>{
        
              }
      );
  }
  selectUsuario(){
    if(this.usuario.perfil=="EST")
      return true;
    else
      return false;
  }
  guardarEntrega(){
    this.tarea.fechaInicio=new Date(this.tarea.fechaInicio);
    this.tarea.fechaFin=new Date(this.tarea.fechaFin);
    console.log(this.tarea);
    if (this.tarea.codigo) {
      this.tarea.id=undefined;
      this.servicio.actualizarTarea(this.tarea).subscribe(
        (resp: any) => {
          console.log(resp);
        }

      )

    }else{
      console.log(this.tarea.fechaInicio);
      this.tarea.foro=this.codigo;
      this.tarea.curso=this.curso;
      this.tarea.fechaEnvio=new Date();
      
      this.tarea.alumno=this.usuario.cod_persona;
      //this.foro.foro=this.foros[0].foro;

      this.servicio.guardarEntregaTarea(this.tarea).subscribe(
        (resp:any)=>{
          console.log(resp);
        }
      );
    }
    location.reload();
  }
  editarTarea(reg: any) {
    this.tarea = reg;
    this.tarea.fechaInicio=this.formatoFecha(this.tarea.fechaInicio);
    this.tarea.fechaFin=this.formatoFecha(this.tarea.fechaFin);
  }
  formatoFecha(fecha){
    var fec_ini=fecha.replace("Z[UTC]","");
    return moment(Date.parse(fec_ini)).format("YYYY-MM-DD");  
  }
  eliminarTarea(reg: any) {
    var _data = { anuncio: parseInt(reg.codigo) };
    //alert(reg.codigo);
    this.servicio.eliminarTarea(reg.codigo).subscribe(
     (resp:any)=>
     {
       console.log(resp);
       location.reload();
     }
    ) ;
  }
  convertirTimeStamp(timpestamp)
  {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timpestamp*1000);
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
