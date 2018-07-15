import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForoComponent } from './view/foro/foro.component';
import { TareaComponent } from './view/tarea/tarea.component';
import { AnuncioComponent } from './view/anuncio/anuncio.component';
import { WikiComponent } from './view/wiki/wiki.component';

const routes: Routes = [

  {
    

    path: 'virtual',
    data: {
      title: 'Aula Virtual'
    },

    children: [
      {
        path: 'foro',
        component: ForoComponent,
        data: {
          title: 'Foros'
        }
      },
      {
        path: 'tarea',
        component: TareaComponent,
        data: {
          title: 'Tareas'
        }
      },
      {
        path: 'wiki',
        component: WikiComponent,
        data: {
          title: 'Wikis'
        }
      },
      {
        path: 'anuncio',
        component: AnuncioComponent,
        data: {
          title: 'Anuncio'
        }
      }
    ]
  },/*

  {
    path: 'anuncio',
    component: AnuncioComponent,
    data: {
      title: 'Anuncio'
    }
  }*/
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualRoutingModule { }
