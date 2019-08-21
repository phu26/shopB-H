import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotTuyenSinhService } from '../../dot-tuyen-sinh.service';
import { DanhSachDotTuyenSinhShowComponent } from '../danh-sach-dot-tuyen-sinh.component';
import { MatIconModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatTableModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DanhSachDotTuyenSinhShowComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    RouterModule
  ],
  providers: [DotTuyenSinhService],
  exports: [DanhSachDotTuyenSinhShowComponent]
})
export class DanhSachDotTuyenSinhShowModule { }
