import { Component, OnInit } from '@angular/core';
import { EvaluacionDocenteService } from '../../../service/evaluacion-docente.service';
import { PersonasService } from '../../../service/personas.service';


@Component({
  selector: 'app-reporte-pregunta',
  templateUrl: './reporte-pregunta.component.html',
  styleUrls: ['./reporte-pregunta.component.css']
})
export class ReportePreguntaComponent implements OnInit {

  constructor(private servicio: EvaluacionDocenteService, private servicioPersona:PersonasService) { }
  private val:Number=3;
  usuario:any; 
  cuestionario:any;
  cuestionarios:any[];
  cuestionarios1:any[]=[];

  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10);
    this.usuario=JSON.parse(sessionStorage.getItem('usuario'));
    if(this.usuario.perfil=="DOC")
      this.cuestionario="CUES001";
    else
      this.cuestionario="CUES002";
    this.servicio.obtenerCalificacionesCuestionario().subscribe(
      (resp:any)=>
      {
        this.cuestionarios=resp;
        console.log(this.cuestionarios)
        this.cuestionarios.forEach(element => {
          this.servicioPersona.obtenerPersonaCedula(element.evaRespuestaCuestionarioPK.codPersona).subscribe(
            (resp1:any)=>{
                var nombres = resp1[0].NOMBRE+" "+resp1[0].APELLIDO
                //console.log(resp1[0].NOMBRE+" "+resp1[0].APELLIDO);
                console.log(nombres);
                this.cuestionarios1.push({codCuestionario:element.evaRespuestaCuestionarioPK.codCuestionario, codEvaluacion:element.evaRespuestaCuestionarioPK.codEvaluacion, codNrc:element.evaRespuestaCuestionarioPK.codNrc, persona: nombres, fecha:element.fecha, calificacion: element.calificacionPromedio});
            },
            (error)=>{
              
                    }
            );
          //var nombres = this.getNombres(element.evaRespuestaCuestionarioPK.codPersona);
          //console.log(nombres);
          
        });

      }
    )
    
  }
  getNombres(cedula){
    // for(var i=0;i<this.foros.length;i++)
      this.servicioPersona.obtenerPersonaCedula(cedula).subscribe(
      (resp1:any)=>{
          var nombres = resp1[0].NOMBRE+" "+resp1[0].APELLIDO
          //console.log(resp1[0].NOMBRE+" "+resp1[0].APELLIDO);
          console.log(nombres);
          return nombres;
      },
      (error)=>{
        
              }
      );
  }

}
