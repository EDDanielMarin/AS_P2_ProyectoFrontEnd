import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload',
  template: `

    `
})
export class ReloadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      sessionStorage.removeItem('jwt');
      sessionStorage.clear();
      location.reload();
  }

}
