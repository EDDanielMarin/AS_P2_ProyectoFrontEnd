import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, PasswordModule, Draggable } from 'primeng/primeng';
import { LoginService } from './service/login.service';



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

  usu:any="";
  pass:any="";
  public usuario:any={};

  msgs: Message[] = [];
  modelMenu: any[]=[];
  constructor(private servicio: LoginService) { }

  ngOnInit() {

  }

  /**Invoca al core para realizar login de la aplicacion. */
  ejecutalogin() {
    
    this.servicio.inicioSesion(this.usu, this.pass).subscribe(
      (resp: any) => {
        if (resp) {
          this.usuario=(resp);
          sessionStorage.setItem('usuario', JSON.stringify(resp));
          this.cargarMenu(resp.perfil);
          this.isLogin = true;  
        }
         else {
          this.msgs.push({ severity: 'error', summary: 'Error ', detail: "Datos incorrectos" });
        // this.dto.mostrarMensaje(this.msgs);
          alert("NO acccess");
         }
      },
      (error: any) => {
        console.log(error.estado);
        console.log(error.codigo);
        this.msgs.push({ severity: 'error', summary: 'Error ', detail: error.estado });
        //this.dto.mostrarMensaje(this.msgs);
      }
    );

  }
  cargarMenu(rol: String) {
     this.servicio.buscaMenu(rol).subscribe(
        res=>{
          this.modelMenu=res.model;
        },
        error=>
        {
          console.log(error);
        }


     );


  }
  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.clear();
    this.usu="";
    this.pass="";
    this.isLogin=false;

  }


}