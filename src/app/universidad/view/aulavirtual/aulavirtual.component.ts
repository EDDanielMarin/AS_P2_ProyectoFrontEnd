import { Component, OnInit } from '@angular/core';
import { AulavirtualService } from '../../service/aulavirtual.service';

@Component({
  selector: 'app-aulavirtual',
  templateUrl: './aulavirtual.component.html',
  styleUrls: ['./aulavirtual.component.css']
})
export class AulavirtualComponent implements OnInit {

  constructor(private servicio:AulavirtualService) {

   }

  ngOnInit() {

    
  }

}
