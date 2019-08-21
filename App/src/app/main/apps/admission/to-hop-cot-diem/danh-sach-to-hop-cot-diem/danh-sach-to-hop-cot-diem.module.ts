import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatGridListModule, MatListModule, MatTooltipModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CotDiemModule } from '../../cot-diem/cot-diem.module';
import { DanhSachToHopCotDiemListComponent, DanhSachToHopCotDiemComponent, DanhSachToHopCotDiemModalComponent } from './danh-sach-to-hop-cot-diem.component';
import { ToHopCotDiemService } from '../to-hop-cot-diem.service';
import { RouterModule } from '@angular/router';
import { ChiTietToHopCotDiemModule } from '../chi-tiet-to-hop-cot-diem/chi-tiet-to-hop-cot-diem.module';
import { ChiTietToHopCotDiemComponent, ChiTietToHopCotDiemModalComponent } from '../chi-tiet-to-hop-cot-diem/chi-tiet-to-hop-cot-diem.component';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';

@NgModule({
  declarations: [DanhSachToHopCotDiemListComponent,DanhSachToHopCotDiemComponent,DanhSachToHopCotDiemModalComponent],
  imports: [
    CommonModule,
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
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    DragDropModule,
    MatExpansionModule,
    MatTooltipModule,
    CotDiemModule,
    RouterModule, ChiTietToHopCotDiemModule
  ],
  providers:[ToHopCotDiemService,HinhThucXetTuyenService],
  exports:[DanhSachToHopCotDiemListComponent,DanhSachToHopCotDiemComponent,DanhSachToHopCotDiemModalComponent],
  entryComponents: [DanhSachToHopCotDiemModalComponent,ChiTietToHopCotDiemComponent,ChiTietToHopCotDiemModalComponent]
})
export class DanhSachToHopCotDiemModule { }
