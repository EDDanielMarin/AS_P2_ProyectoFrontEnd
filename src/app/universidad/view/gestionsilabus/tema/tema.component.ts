import { Component, OnInit } from '@angular/core';
import { SilabusService } from '../../../service/silabus.service';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/components/common/messageservice';

import {Message} from 'primeng/components/common/api';
@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  msgs: Message[] = [];
  constructor(private servicio:SilabusService) { }

  showModificar() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Aviso: ', detail:'Modificado   '});
}
 
  showError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Aviso: ', detail:'Eliminado   '});
}
showSuccess() {
  this.msgs = [];
  this.msgs.push({severity:'success', summary:'Aviso: ', detail:'Guardado correcto   '});
 // this.delay(3000);
}
  private temas:any[];
  private subTemas:any[];
  private tareas:any[];
  private SubtemaTarea: any = {};
  private silabus:any[];
  private cols:any[];
  private colsub:any[];
  private colTarea:any[];
  
  public silabusSeleccionado:any={};

  private subtemaSeleccionado:any={}
  private temaVis:Boolean=false;
  private crudTarea:Boolean=false;
  private crud:Boolean=false;
  private tareaVis: boolean = false;
  private data={
    COD_TEMA:'',
    DESCRIPCION:''
  };
  private dataTarea={
    COD_SUBTEMA:'',
    DESCRIPCION:'',
    PONDERACION:'',
    
  };
  
  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(),10);
   
    this.cols = [
      { field: 'codigo_asignatura', header: 'Asignatura' },
      { field: 'codigo_periodo', header: 'Periodo' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'fecha_elaboracion', header: 'Elaboracion' }

    ];

    this.colsub = [
      { field: 'DESCRIPCION', header: 'Descripcion' }
    ];
    this.colTarea = [
      { field: 'DESCRIPCION', header: 'Descripcion' },
      { field: 'PONDERACION', header: 'Ponderacion' }
    ];
   this.cargarSilabus();

  }
  verTemas(e)
  {
    this.msgs = [];
    this.cargarTemas(e);
  }
  
  verTareas(event) {
    this.msgs = [];
    //   console.log(event);
    // this.temaComp.silabo=event;
    //localStorage.setItem("syl",event);
    this.crudTarea=false;
    this.subtemaSeleccionado=event;
    this.cargarTareas(event);

  }
  cargarTemas(e)
  {
    this.msgs = [];
    this.silabusSeleccionado._id=e.data._id;
    this.servicio.obtener(this.silabusSeleccionado._id,"tema").subscribe(
      (resp: any) => {
        this.temas = resp;
      }
    )
  }
  editarTarea(e)
  {
    this.msgs = [];
    this.subtemaSeleccionado=e;
    
    this.crudTarea=true;

  }
  guardarTarea()
  {
    this.msgs = [];
    this.dataTarea.COD_SUBTEMA=this.subtemaSeleccionado._id;
    console.log(this.dataTarea);
    
    if(!this.dataTarea['_id'])
    {
      this.servicio.guardar(this.dataTarea,"tarea").subscribe(
        (resp:any)=>
        {
          console.log(resp);
          this.crudTarea=false;
          this.cargarTareas(this.subtemaSeleccionado);
        }

      )
    }
    else
    {
      this.servicio.modificar(this.dataTarea,"tarea").subscribe(
        (resp:any)=>
        {
          this.crudTarea=false;
          this.cargarTareas(this.subtemaSeleccionado);
          console.log(resp);
        }
      )
    }
  }

  guardarRegistro()
  {
    this.msgs = [];
    if(!this.data['_id'])
    {
      this.servicio.guardar(this.data,"subtema").subscribe(
        (resp:any)=>
        {
          this.crud=false;
          this.tareaVis=false;
          this.cargarSubTemas(this.subtemaSeleccionado);
          //this.cargarTareas(this.subtemaSeleccionado);
          console.log(resp);
        }

      )
    }
    else
    {
      this.servicio.modificar(this.data,"subtema").subscribe(
        (resp:any)=>
        {
          this.tareaVis=false;
          this.cargarSubTemas(this.subtemaSeleccionado);
         // this.cargarTareas(this.subtemaSeleccionado);
          this.crud=false;
        }

      )

    }
  }

  eliminarTarea(e)
  {
    this.msgs = [];
    if(this.dataTarea['_id'])
    {
      this.servicio.eliminar(this.dataTarea['_id'],'tarea').subscribe(
        (resp:any)=>
        {
          this.crudTarea=false;
          this.cargarTareas(this.subtemaSeleccionado);
          //this.cargarTareas(e);
        },
        err=>
        {
          this.crudTarea=false;
          this.cargarTareas(this.subtemaSeleccionado);
          //this.cargarTareas(e);
        }
      )
    }

  }
  eliminarRegistro(e)
  {
    this.msgs = [];
    if(this.data['_id'])
    {
      this.servicio.eliminar(this.data['_id'],'subtema').subscribe(
        (resp:any)=>
        {
          this.crud=false;
          //this.cargarTemas(e);
        },
        err=>
        {
          this.crud=false;
         //this.cargarTemas(e);
        }
      )
    }

  }
  nuevoRegistro(e) {
    this.msgs = [];
    this.data={
      COD_TEMA:e._id,
      DESCRIPCION:''
    };
    this.crud = true;
  }
  nuevaTarea()
  {
    this.msgs = [];
    this.dataTarea={
      COD_SUBTEMA:'',
      DESCRIPCION:'',
      PONDERACION:'',
      
    };
    this.crudTarea=true;

  }


  cargarSubTemas(e)
  {
    this.msgs = [];
    this.servicio.obtener(e._id,"subtema").subscribe(
      (resp: any) => {
        this.subTemas = resp;
      },
      err=>
      {
        
      }
    )
  }
  cargarTareas(e)
  {
    this.msgs = [];
    this.subtemaSeleccionado=e;
    this.servicio.obtener(e._id,"tarea").subscribe(
      (resp: any) => {
        this.tareas = resp;
        this.tareaVis = true;
        this.crudTarea=false;
      }
    )
  }
  editarRegistro() {
    this.msgs = [];
    this.crud = true;
  }
  verSubtemas(e)
  {
    this.msgs = [];
    this.crud=false;
    this.cargarSubTemas(e);
    this.subtemaSeleccionado=event;
  }

  cargarSilabus() {
    this.msgs = [];
    this.servicio.obtenerSilabus().subscribe(
      (resp: any) => {
        this.silabus = resp;
      }
    )
  }

}
