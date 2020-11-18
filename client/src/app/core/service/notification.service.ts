import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class NotificationService {
  constructor(private messageService: MessageService) {}

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
