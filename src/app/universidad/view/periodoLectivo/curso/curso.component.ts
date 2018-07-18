import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';
import { FacturaService } from '../../../service/factura.service';
import { NotificacionService } from '../../../service/notificacion.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {


  constructor(private servicio: PeriodoService,private facturaServicio: FacturaService, private notificacionService: NotificacionService) { }
  private periodos: any[];
  private nrcs: any[];

  private cols: any[];
  private matricula: any={};
  private estudiante: any = {};
  private periodoSeleccionado: any = {};
  private diag:boolean=false;
  dataFactura = {
    numeroFactura: 0,
    fecha: Date,
    idCliente: '',
    detalles: [],
    total: 0
  }
  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(),this.notificacionService.obtenerURL(), 10)
    
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
    this.facturaServicio.obtenerNumeroFactura().subscribe(
      (resp:any)=>
      {
        this.dataFactura.numeroFactura=++resp.numerofactura;
       
      }
    );



    this.notificacionService.enviarNotificacion({cod_plantilla:"Confirmacion Matricula",mail_alumno:this.estudiante.correo,asunto:"Matriculacion"}).subscribe(
      (resp:any)=>
      {
        console.log(resp);
      }
    );

    console.log(this.dataFactura);

    this.facturaServicio.guardarResgistro(this.dataFactura).subscribe(
      (resp:any)=>
      {
        console.log("Factura generada")
      }
      ,
      error=>
      {
        console.log("Error"+ error)
      }

    )

    
  }
  cancelarMatricula()
  {
    this.diag=false;
  }
 
  obtenerDetalle(arr:any[])
  {
    var det=[]
    arr.forEach(x=>
      {
        det.push({nrc:x.codNrc,precio:x.costoNrc})
      }

    )
    console.log(det);
    return det;

  }
  obtenerMatricula() {
    console.log(this.estudiante);
   var cons = { codPeriodo: this.periodoSeleccionado.codigo, codPersona: this.estudiante.cod_persona }
  // var cons = { codPeriodo: this.periodoSeleccionado.codigo, codPersona: "L00357199" }

    this.servicio.obtenerNrcAlumno(cons).subscribe(
      (resp: any) => {
        if(resp[0])
        {
          this.matricula=resp[0];
          console.log(resp);
          this.dataFactura.detalles=this.obtenerDetalle(this.matricula.detalleMatricula);
        }
        else
        {
          this.matricula={};
        }
          
      }
    )

  }
}
