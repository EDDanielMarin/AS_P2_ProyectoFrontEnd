import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {


  @Input() periodo: any = {};
  @Input() nrcs: any[];

  @Output() submitEvent = new EventEmitter<boolean>();

  data = {
    codPeriodo: '',
    codPersona: '',
    codNrc: ''
  }

  constructor(private servicio: PeriodoService) { }
  private cols: any[];
  private nrcsSeleccionados: any = [];
  private estudiante: any = {};
  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(), 10)
    this.estudiante = JSON.parse(sessionStorage.getItem("usuario"));
    this.cols = [
      { field: 'codAsignatura', header: 'Asignatura' },
      { field: 'codNrc', header: 'NRC' },
      { field: 'codPersona', header: 'Docente' }
    ];
    console.log(this.estudiante)

  }
  guardarMatricula() {
    var n:string = '';
    var i = 0
    this.nrcsSeleccionados.forEach(element => {
      i == 0 ? n+=(element.codNrc) : n+='*'+ element.codNrc
      i++
    });

    this.data.codNrc=n;

    this.data.codPeriodo=this.periodo.codigo
    this.data.codPersona=this.estudiante.cod_persona
    this.servicio.guardarMaticula(this.data).subscribe(
      (resp:any)=>
      {
        this.submitEvent.emit(false);
      }
    )


  }


}
