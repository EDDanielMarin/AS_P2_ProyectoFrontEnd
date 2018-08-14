import { Component, OnInit } from '@angular/core';
import { WikiService } from '../../service/wiki.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PeriodoService } from '../../../universidad/service/periodo.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  constructor(private servicio:WikiService, private servicioPeriodo:PeriodoService) { }
  curso:any;
    selectCurso:any;
    nrcs:any;
  //curso=10;
  wikis:any=[];
  anuncioSeleccionado:any;
  cols: any[];
  usuario:any;
  private wiki:any={};
  private participaciones: boolean = false;
  private enviarwiki:any={};
  ngOnInit() {
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'curso', header: 'Curso' },
      { field: 'tema', header: 'Tema' },
      { field: 'fecha', header: 'Fecha de creación' },
      
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
      this.servicio.obtenerWikiCurso(this.curso).subscribe(
        (resp:any)=>{
           
            console.log(resp);
            this.wikis=resp;
            
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
  seleccionarWiki(){
    //location.href="/#/virtual/foroAlumno";
  }
  verParticipaciones(reg:any){
    //this.enviarWiki=reg;
    this.participaciones=true;
  }
  guardarWiki(){
    this.wiki.fechaInicio=new Date(this.wiki.fechaInicio);
    this.wiki.fechaFin=new Date(this.wiki.fechaFin);
    console.log(this.wiki);
    if (this.wiki.codigo) {
      this.wiki.id=undefined;
      this.servicio.actualizarWiki(this.wiki).subscribe(
        (resp: any) => {
          console.log(resp);
        }

      )

    }else{
      console.log(this.wiki.fechaInicio);
      this.wiki.curso=this.curso;
      this.servicio.guardarWiki(this.wiki).subscribe(
        (resp:any)=>{
          console.log(resp);
        }
      );
    }
    location.reload();
  }
  editarWiki(reg: any) {
    this.wiki = reg;
    this.wiki.fechaInicio=this.formatoFecha(this.wiki.fechaInicio);
    this.wiki.fechaFin=this.formatoFecha(this.wiki.fechaFin);
  }
  formatoFecha(fecha){
    var fec_ini=fecha.replace("Z[UTC]","");
    return moment(Date.parse(fec_ini)).format("YYYY-MM-DD");  
  }
  eliminarWiki(reg: any) {
    var _data = { anuncio: parseInt(reg.codigo) };
    //alert(reg.codigo);
    this.servicio.eliminarWiki(reg.codigo).subscribe(
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
