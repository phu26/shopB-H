import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotTuyenSinhRoutingModule } from '../../dot-tuyen-sinh-routing.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatGridListModule, MatListModule, MatDialogModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { LoaiDiemModule } from '../../../loai-diem/loai-diem.module';
import { LoaiDiemService } from '../../../loai-diem/loai-diem.service';
import { CongThucDiemComponent } from './cong-thuc-diem.component';

@NgModule({
  declarations: [CongThucDiemComponent],
  imports: [
    CommonModule,
    DotTuyenSinhRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    MatListModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatDialogModule,
    DialogModule,
    LoaiDiemModule
  ],
  providers: [LoaiDiemService],
  exports: [CongThucDiemComponent]
})
export class CongThucDiemModule { }
