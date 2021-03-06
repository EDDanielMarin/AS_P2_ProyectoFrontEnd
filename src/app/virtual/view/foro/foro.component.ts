import { Component, OnInit, NgModule } from '@angular/core';
import { ForoService } from '../../service/foro.service';
import * as moment from 'moment';
import { ForoAlumnoComponent } from '../foroAlumno/foroAlumno.component';
import { PeriodoService } from '../../../universidad/service/periodo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  constructor(private servicio:ForoService, private servicioPeriodo:PeriodoService) { }
    curso:any;
    selectCurso:any;
    nrcs:any;
    foros:any=[];
    

    anuncioSeleccionado:any;
    cols: any[];
    usuario:any;
    private foro:any={};
    private participaciones: boolean = false;
    private enviarForo:any={};
    ngOnInit() {
      setTimeout(this.servicioPeriodo.obtenerURL(),10)
      this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
      this.selectCurso=false;
      this.cols = [
        { field: 'codigo', header: 'Codigo' },
        { field: 'curso', header: 'Curso' },
        { field: 'tema', header: 'Tema' },
        { field: 'descripcion', header: 'Descripcion' },
        { field: 'fechaInicio', header: 'Fecha De Inicio' },
        { field: 'fechaFin', header: 'Fecha Final' },
        
      ];
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
      this.servicio.obtenerForosCurso(this.curso).subscribe(
        (resp:any)=>{
           
            console.log(resp);
            this.foros=resp;
            
        },
        (error)=>{
  
        }
  
      );
    }
    selectUsuario(){
      if(this.usuario.perfil=="DOC")
        return true;
      else
        return false;
    }
    seleccionarForo(){
      location.href="/#/virtual/foroAlumno";
    }
    verParticipaciones(reg:any){
      this.enviarForo=reg;
      this.participaciones=true;
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
        //console.log(this.foro.fechaInicio);
        this.foro.curso=this.curso;
        this.servicio.guardarForo(this.foro).subscribe(
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
