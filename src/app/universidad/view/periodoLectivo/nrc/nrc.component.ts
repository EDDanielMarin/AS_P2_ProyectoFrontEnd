import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';

@Component({
  selector: 'app-nrc',
  templateUrl: './nrc.component.html',
  styleUrls: ['./nrc.component.css']
})
export class NrcComponent implements OnInit {

  @Input() periodo:any={};
  @Output() submitEvent= new EventEmitter<boolean>();

  private asignatura:any={};
  private asignaturas:any[];
  private cols:any[];
  data={
    codPeriodo:'',
    cantidadNrc:0,
    codAsignatura:''

  }
  constructor(private servicio: PeriodoService) { }

  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(),10)
    this.asignaturas = [
      { codigo: "12053", descripcion: "Programacion Avanzada" },
      { codigo: "12054", descripcion: "Metodos numericos" },
      { codigo: "12055", descripcion: "Lenguaje y comunicacion" }
    ];

    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'descripcion', header: 'Descripcion' }
    ];
  }
  
  generarNrc()
  {
    if(this.asignatura.codigo!='' && this.periodo.codigo!='' && this.data.cantidadNrc>0)
    {
      this.data.codAsignatura=this.asignatura.codigo;
      this.data.codPeriodo=this.periodo.codigo;
      this.servicio.generarNrc(this.data).subscribe(
        (resp:any)=>
        {
          if(resp)
          this.submitEvent.emit(false);
        }
      )

    }

  }

}
