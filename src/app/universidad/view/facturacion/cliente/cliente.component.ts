import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cols: any[];
  data = {
    razon_social: '',
    num_documento: '',
    direccion: '',
    correo: '',
    telefono: ''
  };
  private clienteSeleccionado: any;

  constructor(private servicio: ClienteService) { }
  private clientes: any[];
  ngOnInit() {
    this.cols = [
      { field: 'razon_social', header: 'Razón Social' },
      { field: 'num_documento', header: 'Número documento' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'correo', header: 'Correo' },
      { field: 'telefono', header: 'Telefono' }
    ];
    this.servicio.obtenerclientes().subscribe(
      (resp: any) => {
        this.clientes = resp;
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  guardarCliente() {
    console.log(this.data);
    if (this.data['_id']) {
      this.servicio.actualizar(this.data).subscribe(
        (resp: any) => {
          console.log(resp);
          // this.clientes.push(this.data);
        }

      )

    }
    else {
      this.servicio.guardar(this.data).subscribe(
        (resp: any) => {
          console.log(resp);
          // this.clientes.push(this.data);
        }
      );
    }

  }
  editarRegistro(reg: any) {
    this.data = reg;
    this.data['_id'] = reg._id;
  }
  eliminarRegistro(reg: any) {
    var _data = { _id: reg._id };
    this.servicio.eliminar(_data).subscribe(
     (resp:any)=>
     {
       console.log(resp);
     }
    ) ;
  }



}
