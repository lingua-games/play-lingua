import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DonateCryptoDialogComponent } from '../donate-crypto-dialog/donate-crypto-dialog.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(private location: Location, private dialog: MatDialog) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  openExternalUrl(url: string): void {
    window.open(url, '_blank');
  }

  openDonateDialog(): void {
    this.dialog.open(DonateCryptoDialogComponent, {
      width: '30%',
    });
  }
}
