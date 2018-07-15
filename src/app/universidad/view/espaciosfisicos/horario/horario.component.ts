import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../service/horario.service';
import { UbicacionService } from '../../../service/ubicacion.service';
import { PeriodoService } from '../../../service/periodo.service';
import { PersonasService } from '../../../service/personas.service';
import { FranjaService } from '../../../service/franja.service';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  constructor(private servicioPersona: PersonasService, 
    private servicioHorario: HorarioService,
    private servicioUbicacion: UbicacionService, 
    private servicioPeriodo: PeriodoService,
    private servicioFranja: FranjaService
  ) { }

   data = {
    codNrc: '',
    codPeriodo: '',
    codUbicacion: '',
    codFranjaMatricula: ''
  }

  private horarios:any[];
  private listaHorarias:any[];
  docente: any = {};
  docentes: any = [];
  docentesFiltrados: any[];

  display: boolean = false;


  private aulas: any[];
  private campus: any[];
  private bloques: any[];
  private edificios: any[];
  private aula:any = {};

  private franjas: any[];
  private nrcs: any[];
  private nrcSeleccionado;
  private periodos: any[];
  private cols: any[];
  private colsf: any[];

  private dias: any[];
  private fds: any[];

  private periodoSeleccionado: any;
  private diaSeleccionado: any;
  private franjasSeleccionadas:any[];
  ngOnInit() {
    //setTimeout(this.servicioPeriodo.obtenerURL(), 10);
    setTimeout(this.servicioPersona.obtenerURL(), this.servicioPeriodo.obtenerURL(), 
    this.servicioUbicacion.obtenerURL(),
    this.servicioFranja.obtenerURL(), this.servicioHorario.obtenerURL(),10);

    this.servicioPeriodo.obtenerPeriodos().subscribe(
      (resp: any) => {
        this.periodos = resp;
      }
    );
    this.servicioPersona.obtenerPersonas().subscribe(
      (resp: any) => {
        this.docentes = resp;
        // console.log(this.docentes) 
      }
    )
    this.servicioUbicacion.obtenerCampus("c").subscribe(
      (resp: any) => {
        this.campus = resp;
        console.log(resp);
      }
    )
    this.cols = [
      { field: 'codAsignatura', header: 'Asignatura' },
      { field: 'codNrc', header: 'NRC' },
      { field: 'codPersona', header: 'Docente' }
    ];
    this.dias = [
      { label: 'Lunes', value: 'LU' },
      { label: 'Martes', value: 'MA' },
      { label: 'Miercoles', value: 'MI' },
      { label: 'Jueves', value: 'JU' },
      { label: 'Viernes', value: 'VI' }
    ];

    this.fds = [,
      { label: 'Sabado', value: 'SA' },
      { label: 'Domingo', value: 'DO' }]


   
  }
  filtrarDocente(event) {
    const query = event.query;
    this.docentesFiltrados = this.buscarDocentes(query)
    console.log(this.docentesFiltrados);
  }
  filtrarFranjas(e)
  {
    console.log(e.option.value.value);
    this.servicioFranja.obtenerFranjasDia(e.option.value.value).subscribe((resp:any)=>{
      this.franjas=resp;
    })

  }
  buscarDocentes(query): any[] {

    const filtered: any[] = [];


    this.docentes.forEach((x) => {
      // console.log(x);
      if (x.CEDULA.toLowerCase().indexOf(query.toLowerCase()) === 0)
        filtered.push(x);
    });
    return filtered;
  }
  obtenerNRC(event) {
    this.servicioPeriodo.obtenerNrcPorPeriodo({ codPeriodo: this.periodoSeleccionado.codigo }).subscribe(
      (resp: any) => {
        this.nrcs = resp;
      }
    )
  }
  obtenerBloques(e) {
    this.servicioUbicacion.obtenerCampus(e.value.codUbicacion).subscribe(
      (resp: any) => {
        this.bloques = resp;
      }
    )
  }
  obtenerEdificios(e) {
    this.servicioUbicacion.obtenerCampus(e.value.codUbicacion).subscribe(
      (resp: any) => {
        this.edificios = resp;
      }
    )
  }

  obtenerAulas(e) {
    this.servicioUbicacion.obtenerCampus(e.value.codUbicacion).subscribe(
      (resp: any) => {
        this.aulas = resp;
      }
    )
  }
  asignarDocente() {
    if (this.docente.CEDULA && this.nrcSeleccionado) {
       this.servicioPeriodo.asignarDocente({codNrc:this.nrcSeleccionado.codNrc,codPersona:this.docente.CEDULA}).subscribe(
         ((resp:any)=>{
            console.log(resp)
         })
       );
    }
    else {
      console.log("A que NRC?")
    }
  }
  guardarHorario()
  {
    if(this.aula.codUbicacion && this.franjasSeleccionadas && this.nrcSeleccionado.codNrc && this.periodoSeleccionado.codigo)
    {
      this.horarios=[];
      console.log(this.nrcSeleccionado);
      console.log(this.franjasSeleccionadas);
      this.franjasSeleccionadas.forEach(x=>{
        
        var temp:any={}
        temp.codFranjaMatricula=x.codFranjaHoraria;        ;
        temp.codNrc=this.nrcSeleccionado.codNrc;
        temp.codPeriodo=this.periodoSeleccionado.codigo;
        temp.codUbicacion=this.aula.codUbicacion;
        this.horarios.push(temp);
      
      })
      console.log(this.horarios);
      this.servicioHorario.guardarHorarioNrc(this.horarios).subscribe(
        (resp:any)=>{
          console.log(resp);
        }
      )
    }
  }


  showDialog() {
    this.display = true;
  }
  cerrarDialog() {
    this.display = false;
  }
  onRowSelect(event) {
     //obtener horario por nrc2
     //obtener docente por cedula

     this.servicioHorario.obtenerhorarioNrc(this.nrcSeleccionado.codNrc).subscribe(
       (resp:any)=>
       {
         if(resp)
         {
           this.servicioFranja.obtenerPorHorario(resp).subscribe(
             (resp1:any)=>{
               // console.log(resp1);
                this.franjasSeleccionadas=resp1;
             }

           )
           this.servicioPersona.obtenerPersonaCedula(this.nrcSeleccionado.codPersona).subscribe(
             (resp:any)=>
             {
               if(resp[0])
               {
                 this.docente=resp[0];
                // console.log(this.docente)

               }
             }
           )
         }
       }
     ) 
  }

onRowUnselect(event) {
  //  this.msgs = [{severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin}];
}
}
