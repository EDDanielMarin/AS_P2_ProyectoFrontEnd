import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../service/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  constructor(private servicio:UbicacionService) { }
  private campus:any[];
  private bloques:any[];
  private campusSeleccionado:any;
private bloqueSeleccionado:any;
  private data={
      descripcion:'',
      codUbicacion:'',
      codUbicacionPadre:''
  }
  private radioValue=1;
  ngOnInit() {
     setTimeout(this.servicio.obtenerURL(),10);
     this.servicio.obtenerCampus("c").subscribe(
       (resp:any)=>
       {
         this.campus=resp;
       }
     );
  }
  filtrarCampus(e:any)
  {
    this.servicio.obtenerCampus(this.campusSeleccionado.codUbicacion).subscribe(
      (resp:any)=>{
        this.bloques=resp;
      },
      error=>
      {
        this.bloques=[{descripcion:"No existen bloques",codUbicacion:null}]
      }
    );
  }
  guardarRegistro()
  {
    if(this.radioValue==1)
    {
      this.data.codUbicacion="S"+this.campus.length+7;
      this.data.codUbicacionPadre=null;
    }
    else if(this.radioValue==2)
    {
      this.data.codUbicacion="L"+this.bloques.length+7;
      this.data.codUbicacionPadre=this.campusSeleccionado.codUbicacion;
    }
    else
    {
      this.data.codUbicacionPadre=this.bloqueSeleccionado.codUbicacion;
      this.data.codUbicacion="U"+this.campus.length+this.bloques.length+5;
    }
    
    this.servicio.guardar(this.data).subscribe(
      (resp:any)=>
      {
        console.log("guardado");
      },
      error=>{
        console.log("error");
      }
    );

  }




}
