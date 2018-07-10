import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../service/horario.service';
import { UbicacionService } from '../../../service/ubicacion.service';
import { PeriodoService } from '../../../service/periodo.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  constructor(private servicioHorario: HorarioService, private servicioUbicacion:UbicacionService, private servicioPeriodo:PeriodoService) { }

  data={
    codNrc:'',
    codPeriodo:'',
    codUbicacion:'',
    codFranjaMatricula:''
  }
  private aulas:any[];
  private franjas:any[];
  private nrcs:any[];
  private periodos:any[];
  private cols:any[];
  private periodoSeleccionado:any;
  ngOnInit() {
    setTimeout(this.servicioPeriodo.obtenerURL(), 10);
    this.servicioPeriodo.obtenerPeriodos().subscribe(
      (resp:any)=>
      {
        this.periodos=resp;
      }
    );
    this.cols = [
      { field: 'codAsignatura', header: 'Asignatura' },
      { field: 'codNrc', header: 'NRC' },
      { field: 'codPersona', header: 'Docente' }
      ];
  }

  obtenerNRC(event)
  {
    //console.log(this.periodoSeleccionado);
    this.servicioPeriodo.obtenerNrcPorPeriodo({codPeriodo:this.periodoSeleccionado.codigo}).subscribe(
      (resp:any)=>
      {
        this.nrcs=resp;
      }
    )
  }


}
