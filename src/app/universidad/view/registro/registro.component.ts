import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { RegistroService } from '../../service/registro.service';
import { PersonasService } from '../../service/personas.service';
import {Md5} from "md5-typescript";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  roles: SelectItem[];
  rolSeleccionado: any;

  claveMD5: ""; 
  auxpssw: boolean = true;

  isActivo: boolean;
  crud: boolean = false;
  persona =
    {
      CEDULA: "",
      NOMBRE: "",
      APELLIDO: "",
      DIRECCION: "",
      TELEFONO: "",
      FEC_NAC: new Date(),
      GENERO: "",
      ESTADO: "ACT",
      CORREO: ""
    }
  data = {
    cod_persona: this.persona.CEDULA,
    cod_usuario: '',
    perfil: '',
    correo: this.persona.CORREO,
    nombre: this.persona.NOMBRE + " " + this.persona.APELLIDO,
    clave: '',
    estado: ''
  }
  private personaSeleccionada: any = {};
  private personas: any[];
  private cols: any[];

  private generos: any[];
  private genero: string;



  constructor(private servicio: RegistroService, private servicioPersona: PersonasService) { }

  ngOnInit() {

    setTimeout(this.servicio.obtenerURL(), this.servicioPersona.obtenerURL(), 10);
    this.roles = [];
    this.servicio.obtenerPerfiles().subscribe(
      (resp: any) => {
        this.roles = resp;
      }
    )
    this.cargar();
    this.cols = [

      { field: 'CEDULA', header: 'Documento' },
      { field: 'NOMBRE', header: 'Nombre' },
      { field: 'APELLIDO', header: 'Apellido' },
      { field: 'DIRECCION', header: 'Direccion' },
      { field: 'TELEFONO', header: 'Telefono' },
      { field: 'CORREO', header: 'Correo' }
    ];
    this.generos = [
      { label: 'Masculino', value: 'Masculino', icon: 'fa fa-male' },
      { label: 'Femenino', value: 'Femenino', icon: 'fa fa-female' }
    ];

  }
  cargar() {
    this.servicioPersona.obtenerPersonas().subscribe
      (
      (resp: any) => {
        this.personas = resp;
        this.crud = false;
      }
      )
  }

  onRowSelect(e) {
    this.auxpssw=false;
    console.log(e.data);
    this.persona['_id'] = e.data._id;

    this.servicio.obtenerUsuarioPersona(this.persona.CEDULA).subscribe(
      (resp: any) => {
        this.data = resp;
        this.rolSeleccionado = resp.perfil;
        this.isActivo = this.data.estado == "ACT";
        this.crud = true;
      },
      err => {
        this.data = {
          cod_persona: this.persona.CEDULA,
          cod_usuario: '',
          perfil: '',
          correo: this.persona.CORREO,
          nombre: this.persona.NOMBRE + " " + this.persona.APELLIDO,
          clave: '',
          estado: ''

        }
        this.crud = true;

      }
    )
  }
  nuevo() {
    this.auxpssw=true;
    this.persona = {
      CEDULA: "",
      NOMBRE: "",
      APELLIDO: "",
      DIRECCION: "",
      TELEFONO: "",
      FEC_NAC: new Date(),
      GENERO: "",
      ESTADO: "ACT",
      CORREO: ""
    };

    this.data = {
      cod_persona: this.persona.CEDULA,
      cod_usuario: '',
      perfil: '',
      correo: this.persona.CORREO,
      nombre: this.persona.NOMBRE + " " + this.persona.APELLIDO,
      clave: '',
      estado: ''
    }
    this.crud = true;
  }
  eliminar() {
    this.crud = false;
  }
  guardarUsuario() {
    if (this.rolSeleccionado != 0) {
      console.log(this.rolSeleccionado);
      if (!this.persona['_id']) {
        this.data.perfil = this.rolSeleccionado.codigo
        this.data.estado = this.isActivo ? "ACT" : "INA";
        this.data.correo = this.persona.CORREO;
        this.data.nombre = this.persona.NOMBRE + " " + this.persona.APELLIDO;
        this.data.cod_persona = this.persona.CEDULA;
        //console.log(Md5.init(this.claveMD5));
        this.data.clave=Md5.init(this.claveMD5);
        this.servicioPersona.guardar(this.persona).subscribe(
          (resp: any) => {
            console.log("Guardado persona")
            this.servicio.guardarUsuario(this.data).subscribe(
              (resp1: any) => {

                console.log("guardado usuario");
                this.claveMD5="";

              },
              (error) => {
                console.log("Error");
              }
            );
          }
        )
      }
      else {
        this.servicioPersona.modificar(this.persona).subscribe(
          (resp: any) => {
            console.log(resp);
            var temp = {
              cod_persona: this.data.cod_persona,
              cod_usuario: this.data.cod_usuario,
              perfil: this.rolSeleccionado.codigo,
              correo: this.data.correo,
              nombre: this.data.nombre,
              clave: this.data.clave,
              estado: this.data.estado
            }
            this.servicio.modificar(temp).subscribe(
              (respu: any) => {
                console.log("usuario");

              }
            )

          }
        )

      }
      this.cargar();
    }
  }

}
