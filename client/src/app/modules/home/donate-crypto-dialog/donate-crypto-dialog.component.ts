import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';

@Component({
  selector: 'app-donate-crypto-dialog',
  templateUrl: './donate-crypto-dialog.component.html',
  styleUrls: ['./donate-crypto-dialog.component.scss'],
})
export class DonateCryptoDialogComponent implements OnInit {
  wallet = '3M6w19ctFyuQGyppX7j7ouqZM96ze3ZEma';

  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {}

  copyWalletNumber(): void {
    const listener = (e: ClipboardEvent) => {
      if (e && e.clipboardData) {
        e.clipboardData.setData('text/plain', this.wallet);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);

    this.notificationService.showMessage('Copied', Severity.success);
  }
}
