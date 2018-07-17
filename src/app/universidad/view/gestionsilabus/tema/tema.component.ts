import { Component, OnInit } from '@angular/core';
import { SilabusService } from '../../../service/silabus.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(private servicio:SilabusService) { }
  private temas:any[];
  private subTemas:any[];
  private tareas:any[];

  private silabus:any[];
  private cols:any[];
  private colsub:any[];
  private colTarea:any[];
  
  public silabusSeleccionado:any={};

  private subtemaSeleccionado:any={}
  private temaVis:Boolean=false;
  private crudTarea:Boolean=false;
  private crud:Boolean=false;
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
    this.cargarTemas(e);
  }
  cargarTemas(e)
  {
    this.silabusSeleccionado._id=e.data._id;
    this.servicio.obtener(this.silabusSeleccionado._id,"tema").subscribe(
      (resp: any) => {
        this.temas = resp;
      }
    )
  }
  editarTarea(e)
  {
    this.subtemaSeleccionado=e;
    
    this.crudTarea=true;

  }
  guardarTarea()
  {
    this.dataTarea.COD_SUBTEMA=this.subtemaSeleccionado._id;
    console.log(this.dataTarea);
    
    if(!this.dataTarea['_id'])
    {
      this.servicio.guardar(this.dataTarea,"tarea").subscribe(
        (resp:any)=>
        {
          console.log(resp);
          this.crudTarea=false;
        }

      )
    }
    else
    {
      this.servicio.modificar(this.dataTarea,"tarea").subscribe(
        (resp:any)=>
        {
          this.crudTarea=false;
          console.log(resp);
        }
      )
    }
  }

  guardarRegistro()
  {
    if(!this.data['_id'])
    {
      this.servicio.guardar(this.data,"subtema").subscribe(
        (resp:any)=>
        {
          this.crud=false;
          this.cargarTareas(this.subtemaSeleccionado);
          console.log(resp);
        }

      )
    }
    else
    {
      this.servicio.modificar(this.data,"subtema").subscribe(
        (resp:any)=>
        {
          this.crud=false;
        }

      )

    }
  }

  eliminarTarea(e)
  {
    if(this.dataTarea['_id'])
    {
      this.servicio.eliminar(this.dataTarea['_id'],'tarea').subscribe(
        (resp:any)=>
        {
          this.crudTarea=false;
          //this.cargarTareas(e);
        },
        err=>
        {
          this.crudTarea=false;
          //this.cargarTareas(e);
        }
      )
    }

  }
  eliminarRegistro(e)
  {
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

    this.data={
      COD_TEMA:e._id,
      DESCRIPCION:''
    };
    this.crud = true;
  }
  nuevaTarea()
  {
    this.crudTarea=true;

  }


  cargarSubTemas(e)
  {
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
    this.subtemaSeleccionado=e;
    this.servicio.obtener(e._id,"tarea").subscribe(
      (resp: any) => {
        this.tareas = resp;
        this.temaVis=true;
        this.crudTarea=false;
      }
    )
  }
  editarRegistro() {

    this.crud = true;
  }
  verSubtemas(e)
  {
    this.cargarSubTemas(e);
  }

  cargarSilabus() {
    this.servicio.obtenerSilabus().subscribe(
      (resp: any) => {
        this.silabus = resp;
      }
    )
  }

}
