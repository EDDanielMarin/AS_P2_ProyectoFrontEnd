import { Component, OnInit } from '@angular/core';
import { AnuncioService } from '../../service/anuncio.service';
import { Router } from '@angular/router';
import { PeriodoService } from '../../../universidad/service/periodo.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
  
  constructor(private servicio:AnuncioService, private servicioPeriodo:PeriodoService) { }
  curso:any;
  selectCurso:any;
  nrcs:any;
  anuncios:any=[];
  anuncioSeleccionado:any;
  cols: any[];
  usuario:any;
  private anuncio:any={};
  ngOnInit() {
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'curso', header: 'Curso' },
      { field: 'tema', header: 'Tema' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'fecha', header: 'Fecha Publicación' },
      
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
    this.servicio.obtenerAnunciosCurso(this.curso).subscribe(
      (resp:any)=>{
         
          console.log(resp);
          this.anuncios=resp;
          
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
  guardarAnuncio(){
    console.log(this.anuncio);
    if (this.anuncio.codigo) {
      console.log("Actualizar "+this.anuncio.fecha);
      this.anuncio.id=undefined;
      this.servicio.actualizarAnuncio(this.anuncio).subscribe(
        (resp: any) => {
          console.log(resp);
        }

      )

    }else{
      //alert(this.curso);
      this.anuncio.fecha=new Date();
      this.anuncio.curso=this.curso;
      console.log(this.anuncio);
      this.servicio.guardarAnuncio(this.anuncio).subscribe(
        (resp:any)=>{
          console.log(resp);
        }
      );
    }
    location.reload();
  }
  editarAnuncio(reg: any) {
    this.anuncio = reg;
  }
  eliminarAnuncio(reg: any) {
    var _data = { anuncio: parseInt(reg.codigo) };
    //alert(reg.codigo);
    this.servicio.eliminarAnuncio(reg.codigo).subscribe(
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
