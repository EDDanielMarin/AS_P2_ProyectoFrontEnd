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
      },
      (error)=>{

      }

    );
  }
  convertirTimeStamp(timpestamp)
  {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timpestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }


}
