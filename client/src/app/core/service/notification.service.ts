import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(public messageService: MessageService) {}

  public showMessage(
    message: string,
    severity: Severity,
    header: string = '',
    key: string = ''
  ): void {
    switch (key) {
      case 'bc':
        this.messageService.add({
          key: 'bc',
          severity: severity.toString(),
          summary: header,
          detail: message,
        });
        break;
      default:
        this.messageService.add({
          severity: severity.toString(),
          summary: header,
          detail: message,
        });
        break;
    }
  }
}

export enum Severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
}
