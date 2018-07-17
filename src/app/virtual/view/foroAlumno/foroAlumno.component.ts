import { Component, OnInit, Input } from '@angular/core';
import { ForoService } from '../../service/foro.service';
import { PersonasService } from '../../../universidad/service/personas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-foroAlumno',
  templateUrl: './foroAlumno.component.html',
  styleUrls: ['./foroAlumno.component.css']
})
export class ForoAlumnoComponent implements OnInit {
  
  @Input() foroComponent:any={};


  constructor(private servicio:ForoService, private servicioPersona:PersonasService) { }
  curso:any;
  codigo:any;
  foros:any=[];
  anuncioSeleccionado:any;
  cols: any[];
  usuario:any;
  private foro:any={};
  ngOnInit() {
    this.curso=this.foroComponent['curso'];
    this.codigo=this.foroComponent['codigo'];
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'foro', header: 'Número de foro' },
      { field: 'estudiante', header: 'Nombre' },
      { field: 'curso', header: 'Curso' },
      { field: 'participacion', header: 'Participacion' },
      { field: 'fecha', header: 'Fecha de comentario' },
      
  ];
    this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
    console.log(this.usuario);
    this.getParticipaciones();
    
  }
  getParticipaciones(){
    this.servicio.obtenerForosAlumno(this.codigo).subscribe(
      (resp:any)=>{
          this.foros=resp;
          for(var i=0;i<this.foros.length;i++)
            this.getNombres(i);
            
      },
      (error)=>{

      }
      
    );
    
  }
  getNombres(i){
    // for(var i=0;i<this.foros.length;i++)
      this.servicioPersona.obtenerPersonaCedula(this.foros[i].alumno).subscribe(
      (resp1:any)=>{
          this.foros[i]['nombrePersona']=resp1[0].NOMBRE+" "+resp1[0].APELLIDO;
          console.log(this.foros[i].nombrePersona);
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
  guardarForo(){
    this.foro.fechaInicio=new Date(this.foro.fechaInicio);
    this.foro.fechaFin=new Date(this.foro.fechaFin);
    console.log(this.foro);
    if (this.foro.codigo) {
      this.foro.id=undefined;
      this.servicio.actualizarForo(this.foro).subscribe(
        (resp: any) => {
          console.log(resp);
        }

      )

    }else{
      console.log(this.foro.fechaInicio);
      this.foro.foro=this.codigo;
      this.foro.curso=this.curso;
      this.foro.fecha=new Date();
      
      this.foro.alumno=this.usuario.cod_persona;
      //this.foro.foro=this.foros[0].foro;

      this.servicio.guardarForoAlumno(this.foro).subscribe(
        (resp:any)=>{
          console.log(resp);
        }
      );
    }
    location.reload();
  }
  editarForo(reg: any) {
    this.foro = reg;
    this.foro.fechaInicio=this.formatoFecha(this.foro.fechaInicio);
    this.foro.fechaFin=this.formatoFecha(this.foro.fechaFin);
  }
  formatoFecha(fecha){
    var fec_ini=fecha.replace("Z[UTC]","");
    return moment(Date.parse(fec_ini)).format("YYYY-MM-DD");  
  }
  eliminarForo(reg: any) {
    var _data = { anuncio: parseInt(reg.codigo) };
    //alert(reg.codigo);
    this.servicio.eliminarForo(reg.codigo).subscribe(
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
