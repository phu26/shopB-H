import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotXetTuyenRoutingModule } from './dot-xet-tuyen-routing.module';
import { DotXetTuyenComponent } from './dot-xet-tuyen.component';
import { DanhSachDotXetTuyenComponent } from './danh-sach-dot-xet-tuyen/danh-sach-dot-xet-tuyen.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatDialogModule, MatCheckboxModule, MatProgressSpinnerModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DotXetTuyenService } from './dot-xet-tuyen.service';
import { ThemDotXetTuyenComponent } from './them-dot-xet-tuyen/them-dot-xet-tuyen.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DotTuyenSinhService } from '../dot-tuyen-sinh/dot-tuyen-sinh.service';
@NgModule({
  declarations: [DotXetTuyenComponent, DanhSachDotXetTuyenComponent, ThemDotXetTuyenComponent],
  imports: [
    CommonModule,
    DotXetTuyenRoutingModule,
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
    MatRippleModule,
    DialogModule,
    MatDialogModule,
    FuseSharedModule,
    MatCheckboxModule,
    FuseWidgetModule,
    MatProgressSpinnerModule
  ],
  providers: [DotXetTuyenService, DotTuyenSinhService]
})
export class DotXetTuyenModule { }
