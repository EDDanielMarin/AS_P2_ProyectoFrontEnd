import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  constructor(private servicio: PeriodoService) { }
  private periodos: any[];
  private nrcs: any[];

  private cols: any[];
  private matricula: any={};
  private estudiante: any = {};
  private periodoSeleccionado: any = {};
  private diag:boolean=false;

  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(), 10)
    
    this.estudiante = JSON.parse(sessionStorage.getItem("usuario"));
    this.cols = [
      { field: 'codNrc', header: 'NRC' },
      { field: 'aprobacionNrc', header: 'Aprobacion' },
      { field: 'costoNrc', header: 'Costo de Materia' }
    ];
    //console.log(this.estudiante);
    this.obtenerPeriodos();
  }
  obtenerPeriodos()
  {
    this.servicio.obtenerPeriodos().subscribe(
      (resp:any)=>
      {
        this.periodos=resp;
      },
      error=>
      {
        
      }
      
    )
  }
  matriculaDiag()
  {
    if(this.periodoSeleccionado)
    this.servicio.obtenerNrcPorPeriodo({codPeriodo: this.periodoSeleccionado.codigo }).subscribe(
      (resp:any)=>
      {
        this.nrcs=resp;
        this.diag=true
      }
    )
  }

  confirmacionMatricula($event){
    
    this.diag=$event;
    this.obtenerMatricula();
    
  }
  cancelarMatricula()
  {
    this.diag=false;
  }
 
  obtenerMatricula() {
   // var cons = { codPeriodo: this.periodoSeleccionado.codigo, codPersona: this.estudiante.codPersona }
   var cons = { codPeriodo: this.periodoSeleccionado.codigo, codPersona: "L00357199" }

    this.servicio.obtenerNrcAlumno(cons).subscribe(
      (resp: any) => {
        if(resp[0])
          this.matricula=resp[0];
        console.log(resp);
      }
    )

  }
}
