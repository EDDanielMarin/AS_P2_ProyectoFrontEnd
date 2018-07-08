import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { RegistroService } from '../../service/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  roles: SelectItem[];
  rolSeleccionado: any;
  isActivo: boolean;
  data = {
    cod_persona: 'eldepersona',
    cod_usuario: '',
    perfil: '',
    correo: 'eldepersona',
    nombre: 'eldepersona',
    clave: '',
    estado: ''
  }




  constructor(private servicio: RegistroService) { }

  ngOnInit() {

    this.roles = [];
    this.roles.push({ label: 'Seleccione un rol', value: 0 });
    this.roles.push({ label: 'Estudiante', value: { id: 1, name: 'Estudiante', code: 'EST' } });
    this.roles.push({ label: 'Docente', value: { id: 2, name: 'Docente', code: 'DOC' } });
    this.roles.push({ label: 'Administrador', value: { id: 3, name: 'Administrador', code: 'ADM' } });
    this.roles.push({ label: 'Director', value: { id: 3, name: 'Director', code: 'DIR' } });

  }


  guardarUsuario() {
    console.log(this.rolSeleccionado);
    if (this.rolSeleccionado != 0) {
      this.data.perfil = this.rolSeleccionado.code
      this.data.estado = this.isActivo ? "ACT" : "INA";

      console.log(this.data);
      this.servicio.guardarUsuario(this.data).subscribe(
        (resp: any) => {

          console.log("guardado");


        },
        (error) => {
          console.log("Error");
        }
      );
    }
  }

}
