import { Component, OnInit } from '@angular/core';
import { EvaluacionDocenteService } from '../../../service/evaluacion-docente.service';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  constructor(private servicio: EvaluacionDocenteService) { }
  private val:Number=3;
  usuario:any; 
  cuestionario:any;
  preguntas:any[];
  preguntas1:any[]=[];
  msgs: Message[] = [];

  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10);
    this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario.perfil=="DOC")
      this.cuestionario="CUES001";
    else
      this.cuestionario="CUES002";
    this.servicio.obtenerPreguntas(this.cuestionario).subscribe(
      (resp:any)=>
      {
        this.preguntas=resp;
        console.log(this.preguntas)
        this.preguntas.forEach(element => {
      
          this.preguntas1.push({id:element.codPregunta,enunciado:element.enunciado,valor:0});
        });
      }
    ) 
  }

  guardarValorPregunta(event){
    console.log(event);
  }

  guardarCuestionario(){
    console.log(this.preguntas1);
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Enviado', detail: 'Respuestas enviadas' });

    for(var i=0;i<this.preguntas1.length;i++)
      this.msgs.push({ severity: 'info', summary: 'Pregunta '+this.preguntas1[i].id, detail: "Valor: "+this.preguntas1[i].valor });
    
  }



}
