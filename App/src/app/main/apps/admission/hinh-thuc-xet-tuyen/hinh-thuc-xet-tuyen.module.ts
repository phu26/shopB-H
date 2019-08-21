import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HinhThucXetTuyenRoutingModule } from './hinh-thuc-xet-tuyen-routing.module';
import { DanhSachHinhThucXetTuyenComponent } from './danh-sach-hinh-thuc-xet-tuyen/danh-sach-hinh-thuc-xet-tuyen.component';
import { HinhThucXetTuyenService } from './hinh-thuc-xet-tuyen.service';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, 
        MatSnackBarModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { ThemHinhThucXetTuyenComponent } from './them-hinh-thuc-xet-tuyen/them-hinh-thuc-xet-tuyen.component';
import { HinhThucXetTuyenComponent } from './hinh-thuc-xet-tuyen.component';
import { LoaiDiemDialog } from './them-hinh-thuc-xet-tuyen/them-hinh-thuc-xet-tuyen.component';

@NgModule({
  declarations: [HinhThucXetTuyenComponent, DanhSachHinhThucXetTuyenComponent, ThemHinhThucXetTuyenComponent, LoaiDiemDialog],
  imports: [
    CommonModule,
    HinhThucXetTuyenRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    FuseSharedModule,
    FuseWidgetModule,
    DialogModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    LoaiDiemDialog
  ],
  providers:[HinhThucXetTuyenService]
})
export class HinhThucXetTuyenModule { }
