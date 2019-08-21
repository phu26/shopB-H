import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDangKyRoutingModule } from './form-dang-ky-routing.module';
import { FormDangKyComponent } from './form-dang-ky.component';

@NgModule({
  declarations: [FormDangKyComponent],
  imports: [
    CommonModule,
    FormDangKyRoutingModule
  ],
  exports: [FormDangKyComponent]
})
export class FormDangKyModule { }
