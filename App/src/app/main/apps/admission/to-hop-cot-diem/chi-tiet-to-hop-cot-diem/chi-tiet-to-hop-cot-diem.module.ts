import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiTietToHopCotDiemComponent, ChiTietToHopCotDiemModalComponent } from './chi-tiet-to-hop-cot-diem.component';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatRadioModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatGridListModule, MatListModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CotDiemModule } from '../../cot-diem/cot-diem.module';
import { RouterModule } from '@angular/router';
import { ToHopCotDiemService } from '../to-hop-cot-diem.service';
import { CotDiemService } from '../../cot-diem/cot-diem.service';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';

@NgModule({
  declarations: [ChiTietToHopCotDiemComponent,ChiTietToHopCotDiemModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
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
    CotDiemModule,
    RouterModule
  ],
  exports:[ChiTietToHopCotDiemComponent,ChiTietToHopCotDiemModalComponent],
  providers: [ToHopCotDiemService,CotDiemService,HinhThucXetTuyenService]
})
export class ChiTietToHopCotDiemModule { }
