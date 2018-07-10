import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../service/ubicacion.service';
import { TreeNode, Message } from 'primeng/api';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  constructor(private servicio: UbicacionService) { }
  private campus: any[];
  private bloques: any[];
  private campusSeleccionado: any;
  private cols: any[];
  private edit: boolean = false;
  msgs: Message[] = [];
  private new:boolean=false;s
  ubicacionTree: TreeNode[];
  bloquesCompleto: any[];
  aulasPorBloque: any[];

  private bloqueSeleccionado: any;
  private data = {
    descripcion: '',
    codUbicacion: '',
    codUbicacionPadre: ''
  }
  private radioValue = 1;
  ngOnInit() {
    setTimeout(this.servicio.obtenerURL(), 10);
    this.servicio.obtenerCampus("c").subscribe(
      (resp: any) => {
        this.campus = resp;
        this.llenarTree();

      }
    );
    this.cols = [
      { field: 'descripcion', header: 'descripcion' }
    ];
  }
  llenarTree() {
    var asd = { data: [] };




    this.campus.forEach(x => {
      var temp_C = {
        data: { cod: '', parent: '', descripcion: "" },
        children: []
      };
      temp_C.data.descripcion = x.descripcion;
      temp_C.data.cod = x.codUbicacion;
      temp_C.data.parent = x.codUbicacionPadre;
      this.servicio.obtenerCampus(x.codUbicacion).subscribe(//obtiene los bloques del campus
        (resp: any) => {
          if (resp)

            resp.forEach(x1 => {//obtiene as aulas del bloque
              var temp_B = {
                data: { cod: '', parent: '', descripcion: "" },
                children: []
              }
              temp_B.data.descripcion = x1.descripcion;
              temp_B.data.cod = x1.codUbicacion;
              temp_B.data.parent = x1.codUbicacionPadre;

              this.servicio.obtenerCampus(x1.codUbicacion).subscribe(
                (resp1: any) => {
                  if (resp1) {
                    temp_B.children = this.obtenerChild(resp1);
                    resp1.forEach(x2 => {
                      this.servicio.obtenerCampus(x2.codUbicacion).subscribe(
                        (res: any) => {
                          temp_B.children = this.obtenerChild(res);
                        }
                      )
                    })
                  }

                },
                error => {
                  console.error("Error en aulas", JSON.stringify(error))
                }
              )
              temp_C.children.push(temp_B);
            }),
              error => {
                console.error("Error en bloques", JSON.stringify(error))
              }
        }
      );
      asd.data.push(temp_C);
      //this.ubicacionTree.push(temp_C);

    })
    console.log(asd);

    this.ubicacionTree = <TreeNode[]>asd.data;
  }

  obtenerChild(data: any[]) {
    var obj = new Array();
    data.forEach(x => {
      var temp = {
        data: { descripcion: "", parent: '', cod: '' },
        children: []
      };
      temp.data.cod = x.codUbicacion;
      temp.data.descripcion = x.descripcion;
      temp.data.parent = x.codUbicacionPadre;
      obj.push(temp);
    })
    return obj;

  }


  filtrarCampus(e: any) {
    this.servicio.obtenerCampus(this.campusSeleccionado.codUbicacion).subscribe(
      (resp: any) => {
        this.bloques = resp;
      },
      error => {
        this.bloques = [{ descripcion: "No existen bloques", codUbicacion: null }]
      }
    );
  }
  guardarRegistro() {
    if (this.radioValue == 1) {
      this.data.codUbicacionPadre = null;
    }
    else if (this.radioValue == 2) {
      this.data.codUbicacionPadre = this.campusSeleccionado.codUbicacion;
    }
    else {
      this.data.codUbicacionPadre = this.bloqueSeleccionado.codUbicacion;
    }
    if (this.data.codUbicacion == '')
      this.servicio.guardar(this.data).subscribe(
        (resp: any) => {
          console.log("guardado");
        },
        error => {
          console.log("error");
        }
      );
      else
      this.servicio.modificar(this.data).subscribe(
        (resp:any)=>
        {
          console.log("Actualizado")
        },
        err=>
        {
          console.log(JSON.stringify(err));

        }
      );



  }

  editarRegistro(event) {
  
    this.data.descripcion = event.descripcion;
    this.data.codUbicacion = event.cod;
    this.data.codUbicacionPadre=event.parent;
    this.edit = true;


  }

  onRowUnselect(event) {
    this.msgs = [{ severity: 'info', summary: 'Car Unselected', detail: 'Vin: ' + event.descripcion }];
  }

  nuevoRegistro()
  {
    this.data = {
      descripcion: '',
      codUbicacion: '',
      codUbicacionPadre: ''
    }
    this.new=true;
    this.edit = false;

  }




}
