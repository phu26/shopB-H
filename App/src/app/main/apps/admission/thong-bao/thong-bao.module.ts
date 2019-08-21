import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongBaoComponent } from './thong-bao.component';

@NgModule({
  declarations: [ThongBaoComponent],
  imports: [
    CommonModule
  ],
  exports: [ThongBaoComponent]
})
export class ThongBaoModule { }
