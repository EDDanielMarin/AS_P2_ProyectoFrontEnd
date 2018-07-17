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
  cuestionario:any="CUES001";
  preguntas:any[];
  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10);
    this.servicio.obtenerPreguntas(this.cuestionario).subscribe(
      (resp:any)=>
      {
        this.preguntas=resp;
        console.log(this.preguntas)
      }
    )
  }



}
