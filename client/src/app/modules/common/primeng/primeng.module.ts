import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  exports: [ButtonModule, MultiSelectModule],
})
export class PrimengModule {}
