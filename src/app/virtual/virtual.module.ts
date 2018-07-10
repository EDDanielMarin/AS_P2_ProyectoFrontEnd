import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualRoutingModule } from './virtual-routing.module';
import { ForoComponent } from './view/foro/foro.component';
import { AnuncioComponent } from './view/anuncio/anuncio.component';
import { TareaComponent } from './view/tarea/tarea.component';
import { WikiComponent } from './view/wiki/wiki.component';

@NgModule({
  imports: [
    CommonModule,
    VirtualRoutingModule
  ],
  declarations: [ForoComponent, AnuncioComponent, TareaComponent, WikiComponent]
})
export class VirtualModule { }
