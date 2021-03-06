import { Component, OnInit, ViewChild } from '@angular/core';
import { SilabusService } from '../../../service/silabus.service';
import { PeriodoService } from '../../../service/periodo.service';
//import { TemaComponent } from '../tema/tema.component';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/components/common/messageservice';

import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-silabus',
  templateUrl: './silabus.component.html',
  styleUrls: ['./silabus.component.css']
})
export class SilabusComponent implements OnInit {
  msgs: Message[] = [];
  constructor(private servicio: SilabusService, private servicioPeriodo: PeriodoService, ) { }

  showModificar() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Aviso: ', detail:'Modificado  '});
}
 
  showError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Aviso: ', detail:'Eliminado  '});
}
showSuccess() {
  this.msgs = [];
  this.msgs.push({severity:'success', summary:'Aviso: ', detail:'Guardado correcto  '});
 // this.delay(3000);
}
  private asignaturas: any[];
  private periodos: any[];
  private silabus: any[];
  private cols: any[];
  private colsTemas: any[];
  private temas: any[];
  private seguimiento: any[];
  
  private asignaturaSeleccionada: any = {};
  private periodoSeleccionado: any = {};
  private silaboParaTema: any = {};
  
  private data = {
    codigo_asignatura: '',
    codigo_periodo: '',
    descripcion: '',
    fecha_elaboracion: new Date()
  };
  
  private dataTema = {
    COD_SILABO: '',
    NOMBRE: '',
    FECHA_INICIO: '',
    FECHA_FIN: ''
  };
  
  private f1:Date;
  private f2:Date;

  private crud: boolean = false;
  private temaVis: boolean = false;
  private crudTema: boolean = false;
  //@ViewChild(TemaComponent) temaComp: TemaComponent;

  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(), this.servicioPeriodo.obtenerURL(), 10);
    this.asignaturas = [
      { codigo: "12053", descripcion: "Programacion Avanzada" },
      { codigo: "12054", descripcion: "Metodos numericos" },
      { codigo: "12055", descripcion: "Lenguaje y comunicacion" }
    ];
    this.servicioPeriodo.obtenerPeriodos().subscribe(
      (resp: any) => {
        this.periodos = resp;
        console.log(this.periodos)
      }
    );
   
    //seg3:seguimiento[];
    this.cargarSilabus();
    this.colsTemas = [
      { field: 'NOMBRE', header: 'NombreTema' },
      { field: 'FECHA_INICIO', header: 'Inicio' },
      { field: 'FECHA_FIN', header: 'Fin' }

    ];
    this.cols = [
      { field: 'codigo_asignatura', header: 'Asignatura' },
      { field: 'codigo_periodo', header: 'Periodo' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'fecha_elaboracion', header: 'Fecha de Elaboracion' }

    ];

  }
  nuevoTema()
  {
    this.crudTema=true;
    this.msgs = [];
    this.dataTema = {
      COD_SILABO: '',
      NOMBRE: '',
      FECHA_INICIO: '',
      FECHA_FIN: ''
    };
  }
  verTemas(event) {
  
    //   console.log(event);
    // this.temaComp.silabo=event;
    //localStorage.setItem("syl",event);
    this.msgs = [];
    this.crudTema=false;
    this.silaboParaTema=event;
    this.cargarTemas(event);

  }
  cargarTemas(t) {
    this.msgs = [];
    this.servicio.obtener(t._id, "tema").subscribe(
      (resp: any) => {
        this.temas = resp;
        this.temaVis = true;
      }
    )
  }
  cargarSilabus() {
    this.msgs = [];
    this.servicio.obtenerSilabus().subscribe(
      (resp: any) => {
        this.silabus = resp;
      }
    )
  }
  editarRegistro() {
    this.msgs = [];
    this.periodoSeleccionado = this.periodos.find(x => x.codigo == this.data.codigo_periodo);
    this.asignaturaSeleccionada = this.asignaturas.find(x => x.codigo == this.data.codigo_asignatura)
    
    this.crud = true;
  }
  editarTema()
  {
    this.msgs = [];
    //this.dataTema['_id']=e.data._id;
    this.f1=new Date(this.dataTema.FECHA_INICIO);
    this.f2=new Date(this.dataTema.FECHA_FIN);
    console.log(this.dataTema);
    this.crudTema=true;
  }
  nuevoRegistro() {
    this.msgs = [];
    this.data = {
      codigo_asignatura: '',
      codigo_periodo: '',
      descripcion: '',
      fecha_elaboracion: new Date()
    };
    this.crud = true;
  }
  eliminarRegistro() {
    this.msgs = [];
    if (this.data['_id']) {
      this.servicio.eliminar(this.data['_id'], "syllabus").subscribe(
        (resp:any)=>
        {
          this.crud=false;
          this.cargarSilabus();
        },
        err=>
        {
          this.crud=false;
          this.cargarSilabus();
        }
      );
    }
  }
  guardarTema()
  {
    this.msgs = [];
    this.dataTema.COD_SILABO=this.silaboParaTema._id;
    this.dataTema.FECHA_INICIO=this.f1.toISOString();
    this.dataTema.FECHA_FIN=this.f2.toISOString();
    
    console.log(this.dataTema);

    if(this.dataTema['_id'])
    {
      this.servicio.modificar(this.dataTema,'tema').subscribe(
        (resp:any)=>
        {
          console.log(resp);
          this.crudTema=false;
          this.cargarTemas(this.silaboParaTema);
        }
      )
    }
    else
      this.servicio.guardar(this.dataTema,'tema').subscribe(
        (resp:any)=>
        {
          console.log(resp);
          this.crudTema=false;
          this.cargarTemas(this.silaboParaTema);
        }
      )
  }
  eliminarTema()
  {
    this.msgs = [];
    console.log(this.dataTema);
    if(this.dataTema['_id'])
    {
      this.servicio.eliminar(this.dataTema['_id'],'tema').subscribe(
        (resp:any)=>
        {
          this.crudTema=false;
          this.cargarTemas(this.silaboParaTema);
        },
        err=>
        {
          this.crudTema=false;
          this.cargarTemas(this.silaboParaTema);
        }
      )
    }

  }
  guardarRegistro() {
    //this.crud=true;
    this.msgs = [];
    if (this.periodoSeleccionado && this.asignaturaSeleccionada) {
      this.data.codigo_asignatura = this.asignaturaSeleccionada.codigo;
      this.data.codigo_periodo = this.periodoSeleccionado.codigo;
      if (this.data['_id']) {
        this.servicio.modificar(this.data, 'syllabus').subscribe(
          (resp: any) => {
            console.log(resp);
            this.crud = false;
            this.cargarSilabus();
          }
        );
      }
      else {
       
        this.data.fecha_elaboracion = new Date();
        this.servicio.guardar(this.data, 'syllabus').subscribe(
          (resp: any) => {
            console.log(resp);
            this.crud = false;
            this.cargarSilabus();
          }
        );
      }
    }
  }

}
