import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading.directive';

@NgModule({
  declarations: [LoadingDirective],
  exports: [LoadingDirective],
})
export class DirectiveModule {}
