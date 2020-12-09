import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../core/service/notification.service';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  exports: [ButtonModule, MultiSelectModule, ToastModule, DropdownModule],
  providers: [MessageService, NotificationService],
})
export class PrimengModule {}
