import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhSachDotTuyenSinhQuanLyComponent, BaseDanhSachDotTuyenSinhComponent, DanhSachDotTuyenSinhComponent, DanhSachDotTuyenSinhShowComponent } from './danh-sach-dot-tuyen-sinh.component';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatSnackBarModule, MatTableModule, MatListModule, MatDialogModule, MatTooltipModule, MatExpansionModule, MatMenuModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { RouterModule } from '@angular/router';
import { CongThucDiemComponent } from '../chi-tiet-dot-tuyen-sinh/cong-thuc-diem/cong-thuc-diem.component';
import { DanhSachDotTuyenSinhShowModule } from './danh-sach-dot-tuyen-sinh-show/danh-sach-dot-tuyen-sinh-show.module';

@NgModule({
  declarations: [DanhSachDotTuyenSinhQuanLyComponent,BaseDanhSachDotTuyenSinhComponent,DanhSachDotTuyenSinhComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatListModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatDialogModule,
    DialogModule,
    RouterModule,
    MatTooltipModule,
    DanhSachDotTuyenSinhShowModule
  ],
  exports: [DanhSachDotTuyenSinhQuanLyComponent,DanhSachDotTuyenSinhShowComponent]
})
export class DanhSachDotTuyenSinhModule { }
