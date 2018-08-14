import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';
import { NotificacionService } from '../../../service/notificacion.service';

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

  constructor(private servicio: PeriodoService, private notificacionService: NotificacionService) { }
  private cols: any[];
  private nrcsSeleccionados: any = [];
  private estudiante: any = {};
  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(), this.notificacionService.obtenerURL(),10)
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
        //Envio notificacion
        this.notificacionService.enviarNotificacion(
          {
            cod_plantilla: "Matricula Periodo Lectivo",
            mail_alumno: "joelito93alexander@gmail.com",
            asunto: "Matricula Periodo Lectivo",
            cod_alumno:this.estudiante.cod_persona,
            datos: [
              {
                variable: "nombre",
                valor: this.estudiante
              },
              {
                variable: "periodo",
                valor: this.periodo.codigo
              },
              {
                variable: "docente",
                valor: this.estudiante.cod_persona
              }

            ]
          }

        ).subscribe(
          (resp_: any) => {
            console.log(resp);

          }
        );



      }
    )


  }


}
