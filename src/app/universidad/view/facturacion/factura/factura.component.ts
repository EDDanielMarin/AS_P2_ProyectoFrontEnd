import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FacturaService } from '../../../service/factura.service';
import { ClienteService } from '../../../service/cliente.service';
import { NotificacionService } from '../../../service/notificacion.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private facturaServicio: FacturaService, private clienteServicio: ClienteService, private notificacionService:NotificacionService) { }
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
  private colsDet: any[];
  

  private facturas: any[]=[];
  private facturaSeleccionada:any={};
  
  private clientesFiltrados: any[];

  private diag:any=false;

  
  private adm:any=false;

  

  ngOnInit() {
    setTimeout(this.notificacionService.obtenerURL(),10 )
    this.estudiante = JSON.parse(sessionStorage.getItem("usuario"));
    this.adm=this.estudiante.perfil=='ADM'
    
    this.cols = [
      { field: 'numeroFactura', header: 'Numero' },
      { field: 'cliente', header: 'Cedula Cliente' },
      { field: 'fechaDeEmision', header: 'Emision' },
      { field: 'total', header: 'Total' }
    ];
    this.colsDet = [
      { field: 'nrc', header: 'NRC' },
      { field: 'precio', header: 'Precio' },
    ];
    /*
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
    */
    this.obtenerFactura();
  }

  ver(e?)
  {
    this.diag=true;
  }
  cerrar()
  {
    this.diag=false;
  }
  obtenerFactura() {
    var consul;
    if(this.estudiante.perfil=='EST')
       consul=this.facturaServicio.obtenerFactura(this.estudiante.cod_persona)  
    else
      consul=this.facturaServicio.obtenerFacturas()
    
    consul.subscribe(
        (resp: any) => {
          this.facturas = resp;
          console.log(resp);
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
    this.data.total = 0;
    this.data.detalles.forEach(x => {
      this.data.total += x.precio;
    })

  }
  cancelarFactura()
  {
    var data={
      numeroFactura:this.facturaSeleccionada.numeroFactura,
      estado:"pagado"
    }
    this.facturaServicio.actualizarFactura(data).subscribe(
      (resp:any)=>
      {
          this.diag=false;

          this.notificacionService.enviarNotificacion(
            {
              cod_plantilla: "Factura Cancelada",
              mail_alumno: this.estudiante.correo,
              asunto: "Facturacion Matricula Cancelacion",
              cod_alumno: this.estudiante.cod_persona,
              datos: [
                {
                  variable: "nombre",
                  valor: this.estudiante.nombre
                },
                {
                  variable: "periodo",
                  valor: 1010
                },
                {
                  variable: "total",
                  valor: this.facturaSeleccionada.total
                }
                ,
                {
                  variable: "numero",
                  valor: this.facturaSeleccionada.numeroFactura
                },
                {
                  variable: "fecha",
                  valor: new Date()
                }
  
  
  
              ]
            }
  
          ).subscribe(
            (resp1: any) => {
              //console.log(resp1);
            }
          );

          
      }
    )

  }
  guardarFactura() {
    this.data.idCliente = this.cliente._id;
    this.facturaServicio.guardarResgistro(this.data).subscribe(
      (resp: any) => {
        console.log(resp);
      }
    );
  }
}
