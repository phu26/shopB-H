import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhSachCotDiemComponent } from './danh-sach-cot-diem/danh-sach-cot-diem.component';
import { CotDiemComponent } from './cot-diem.component';
import { CotDiemService } from './cot-diem.service';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChiTietCotDiemComponent } from './chi-tiet-cot-diem/chi-tiet-cot-diem.component';

@NgModule({
  declarations: [CotDiemComponent, DanhSachCotDiemComponent, ChiTietCotDiemComponent],
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
  providers: [CotDiemService],
  exports: [DanhSachCotDiemComponent],
  entryComponents: [ChiTietCotDiemComponent]
})
export class CotDiemModule { }
