import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FacturaService } from '../../../service/factura.service';
import { ClienteService } from '../../../service/cliente.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private facturaServicio: FacturaService, private clienteServicio: ClienteService) { }
  data = {
    numeroFactura: 0,
    fecha: Date,
    idCliente: '',
    detalles: [],
    total: 0
  }
  private cliente: any = {};
  private estudiante: any = {};
  private clientes: [any];
  private cols: any[];
  private facturas: any[];
  private clientesFiltrados: any[];
  ngOnInit() {
    this.estudiante = JSON.parse(sessionStorage.getItem("usuario"));
    this.cols = [
      { field: 'numeroFactura', header: 'Numero' },
      { field: 'fechaDeEmision', header: 'Emision' },
      { field: 'total', header: 'Total' }
    ];
    this.data.detalles = [
      { nrc: "N-105", asignatura: "Programacion Avanzada", precio: 55.20 },
      { nrc: "N-555", asignatura: "Metodos numericos", precio: 20 },
      { nrc: "N-965", asignatura: "Lenguaje y comunicacion", precio: 12.5 }
    ];
    this.clienteServicio.obtenerclientes().subscribe(
      (resp: any) => {
        this.clientes = resp;
      }
    );
    this.calcularTotal();
    this.facturaServicio.obtenerNumeroFactura().subscribe(
      (resp:any)=>
      {
        this.data.numeroFactura=++resp.numerofactura;
      }
    );
  }


  obtenerFactura()
  {
    this.facturaServicio.obtenerFactura(this.estudiante.cod_persona).subscribe(
      (resp:any)=>
      {
        this.facturas=resp;
      }
    );
  }
  filtrarCliente(event) {
    const query = event.query;
    this.clientesFiltrados = this.buscarClientes(query, this.clientes)
  }
  buscarClientes(query, clientes: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results,
    // for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      if (cliente.num_documento.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(cliente);
      }
    }
    return filtered;
  }
  calcularTotal() {
    this.data.total=0;
     this.data.detalles.forEach(x=>{
       this.data.total+=x.precio;
     })

  }
  guardarFactura()
  {
    this.data.idCliente=this.cliente._id;
    this.facturaServicio.guardarResgistro(this.data).subscribe(
      (resp:any)=>{
        console.log(resp);
      }
    );
  }
}
