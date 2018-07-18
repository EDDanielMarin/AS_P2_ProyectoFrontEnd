import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) { }

  addSingle(mensaje:Message) {
    //{ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' }
    this.messageService.add(mensaje);
  }

  addMultiple(mensajes:Message[]) {
    this.messageService.addAll(mensajes);
  }

  clear() {
    this.messageService.clear();
  }
}
