import { Component, OnInit } from '@angular/core';
import { FranjaService } from '../../../service/franja.service';

@Component({
  selector: 'app-franja',
  templateUrl: './franja.component.html',
  styleUrls: ['./franja.component.css']
})
export class FranjaComponent implements OnInit {

  constructor(private servicio:FranjaService) { }

  franjas:any=[];
  frnjaSeleccionada:any;
  cols: any[];

  ngOnInit() {
    this.cols = [
      { field: 'codFranjaHoraria', header: 'Codigo' },
      { field: 'inicioHora', header: 'Hora Inicio' },
      { field: 'finHora', header: 'Hora Fin' },
      { field: 'dia', header: 'Dia' }
  ];
    this.servicio.obtenerFranjas().subscribe(
      (resp:any)=>{
          this.franjas=resp;
          console.log(this.franjas);
      },
      (error)=>{

      }

    );
  }


}
