import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualRoutingModule } from './virtual-routing.module';
import { ForoComponent } from './view/foro/foro.component';
import { ForoAlumnoComponent } from './view/foroAlumno/foroAlumno.component';
import { EntregaTareaComponent } from './view/entregaTarea/entregaTarea.component';
import { AnuncioComponent } from './view/anuncio/anuncio.component';
import { TareaComponent } from './view/tarea/tarea.component';
import { WikiComponent } from './view/wiki/wiki.component';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  imports: [
    CommonModule,
    VirtualRoutingModule,
    CommonModule, 
    DataTableModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
  ],
  declarations: [ForoComponent, AnuncioComponent, TareaComponent, WikiComponent, ForoAlumnoComponent,EntregaTareaComponent]
})
export class VirtualModule { }
