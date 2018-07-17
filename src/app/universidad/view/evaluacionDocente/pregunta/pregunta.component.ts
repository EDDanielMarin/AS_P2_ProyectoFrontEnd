import { Component, OnInit } from '@angular/core';
import { EvaluacionDocenteService } from '../../../service/evaluacion-docente.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  constructor(private servicio: EvaluacionDocenteService) { }
  private val:Number=3;
  preguntas:any[];
  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10);
    this.servicio.obtenerPreguntas("CUES001").subscribe(
      (resp:any)=>
      {
        this.preguntas=resp;
        console.log(this.preguntas)
      }
    )
  }



}
