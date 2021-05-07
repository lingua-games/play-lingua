import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../core/service/notification.service';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  exports: [
    ButtonModule,
    MultiSelectModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    ToggleButtonModule,
    TooltipModule,
  ],
  providers: [MessageService, NotificationService],
})
export class PrimengModule {}
