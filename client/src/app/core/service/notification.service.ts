import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(public messageService: MessageService) {}

  showMessage(message, severity: Severity, header: string = 'Error'): void {
    this.messageService.add({
      severity: severity.toString(),
      summary: header,
      detail: message,
    });
  }
}

export enum Severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
}
