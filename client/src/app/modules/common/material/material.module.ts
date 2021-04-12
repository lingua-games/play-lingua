import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {}
