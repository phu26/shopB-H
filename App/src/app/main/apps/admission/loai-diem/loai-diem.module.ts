import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhSachLoaiDiemComponent } from './danh-sach-loai-diem/danh-sach-loai-diem.component';

import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { LoaiDiemService } from './loai-diem.service';



@NgModule({
  declarations: [DanhSachLoaiDiemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    DragDropModule,
    FuseSharedModule,
    FuseWidgetModule,
    DialogModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
providers: [LoaiDiemService],
exports: [DanhSachLoaiDiemComponent]
})
export class LoaiDiemModule { }
