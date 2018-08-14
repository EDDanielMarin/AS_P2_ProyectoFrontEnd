import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, PasswordModule, Draggable } from 'primeng/primeng';
import { LoginService } from './service/login.service';
import { AccesoService } from './service/accesos.service';
import { GetIpCliente } from './service/client-ip.service';
import { Md5 } from "md5-typescript";
import { AlertService } from '../config/global/alert.service';
import { NotificacionService } from '../universidad/service/notificacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  public isLogin: boolean = false;
  /**Control de ejecucion del login, previene que se ejecute varias veces el boton del login. */
  private enejecucion = false;
  /**Objeto que contine mensajes aplicativos. */

  usu: any = "";
  pass: any = "";
  public usuario: any = {};
  estadoResp: any = "";

  ipCliente: "";
  data = {
    tipoAcceso: '',
    codigoUsuario: '',
    perfil: '',
    ip: '',
    funcionalidad: '',
    resultado: ''
  }

  msg: Message[] = [];
  modelMenu: any[] = [];
  notificaciones: any[] = [];
  
  constructor(private servicio: LoginService, private servicioRegistroAcceso: AccesoService, private servicioIpCliente: GetIpCliente, private servicioAlerta: AlertService, private notificacionService: NotificacionService) { }

  ngOnInit() {

    setTimeout(this.servicioRegistroAcceso.obtenerURL(),this.notificacionService.obtenerURL(), 10);

    this.servicioIpCliente.getIpAddress().subscribe(
      (resp: any) => {
        this.ipCliente = resp.ip;
      }
    )

  }

  /**Invoca al core para realizar login de la aplicacion. */
  ejecutalogin() {

    this.servicio.inicioSesion(this.usu, Md5.init(this.pass)).subscribe(
      (resp: any) => {
        if (resp) {
          this.usuario = (resp);
          sessionStorage.setItem('usuario', JSON.stringify(resp));
          this.cargarMenu(resp.perfil);
          this.isLogin = true;
          //alert("Acceso Consedido!");




          this.notificacionService.enviarNotificacionSMS(
            {
              cod_plantilla: "Login",
              mail_alumno: "593983023577",
              asunto: "Login",
              cod_alumno:resp.cod_persona,
              datos: [
                {
                  variable: "nombre",
                  valor: resp.nombre
                },
                {
                  variable: "fecha",
                  valor: new Date()
                }

              ]
            }

          ).subscribe(
            (resp_: any) => {


                  this.obtenerNotificaciones(resp)

            }
          );

          this.notificacionService.enviarNotificacion(
            {
              cod_plantilla: "Login",
              mail_alumno: "joelito93alexander@gmail.com",
              asunto: "Login",
              cod_alumno:resp.cod_persona,
              datos: [
                {
                  variable: "nombre",
                  valor: resp.nombre
                },
                {
                  variable: "fecha",
                  valor: new Date()
                }

              ]
            }

          ).subscribe(
            (resp_: any) => {


                  this.obtenerNotificaciones(resp)

            }
          );


          /*
              REGISTRO DE ACCESO CONCEDIDO
          */
         console.log("a guardar OK!");
          this.data = {
            tipoAcceso: "Seguridades-Login",
            codigoUsuario: resp.cod_usuario,
            perfil: resp.perfil,
            ip: this.ipCliente,
            funcionalidad: "login",
            resultado: "200"
          }
          
          //console.log(JSON.stringify(this.data));
          this.servicioRegistroAcceso.guardarAcceso(this.data).subscribe(
            (resp1: any) => {
              console.log("Acceso Guardado!");
            },
            (error) => {
              console.log("Error");
            }
          );

        }
        else {
          this.msg.push({ severity: 'error', summary: 'Error ', detail: "Datos incorrectos" });
          this.servicioAlerta.addMultiple(this.msg);
          //this.servicioAlerta.clear();
        }
      },
      (error: any) => {
        console.log(error.estado);
        console.log(error.codigo);
        this.servicioAlerta.addMultiple(this.msg);


        //this.servicioAlerta.clear();
        if(error.codigo=="404")
          this.estadoResp="No existe usuario!";
        if(error.codigo=="403")
          this.estadoResp="Clave Incorrecta!";
        if(error.codigo=="401")
          this.estadoResp="Usuario Bloqueado!";

          alert(this.estadoResp);


        /*
              REGISTRO DE ACCESO DENEGADO
          */
         console.log("a guardar ERR!");
        this.data = {
          tipoAcceso: "Seguridades-Login",
          codigoUsuario: this.usu,
          perfil: "",
          ip: this.ipCliente,
          funcionalidad: "login",
          resultado: error.codigo
        }
        this.servicioRegistroAcceso.guardarAcceso(this.data).subscribe(
          (resp1: any) => {
            console.log("Acceso Guardado!");
          },
          (error) => {
            console.log("Error");
          }
        );

      }
    );

  }
  cargarMenu(rol: String) {
    this.servicio.buscaMenu(rol).subscribe(
      res => {
        this.modelMenu = res.model;
        sessionStorage.setItem("menu", JSON.stringify(this.modelMenu))

      },
      error => {
        console.log(error);
      }


    );


  }
  obtenerNotificaciones(resp)
  {
    console.log(resp)
    this.notificacionService.obtenerURL();
    this.notificacionService.obtenerNotificaciones(resp.cod_persona).subscribe(asd=>this.notificaciones=(asd))
    
  }
  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('menu');
    sessionStorage.clear();
    this.usu = "";
    this.pass = "";
    this.isLogin = false;

  }


}