import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhuVucUuTienRoutingModule } from './khu-vuc-uu-tien-routing.module';
import { KhuVucUuTienComponent } from './khu-vuc-uu-tien.component';
import { DanhSachKhuVucUuTienComponent } from './danh-sach-khu-vuc-uu-tien/danh-sach-khu-vuc-uu-tien.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatDialogModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { KhuVucUuTienService } from './khu-vuc-uu-tien.service';
import { ThemKhuVucUuTienComponent } from './them-khu-vuc-uu-tien/them-khu-vuc-uu-tien.component';

@NgModule({
  declarations: [KhuVucUuTienComponent, DanhSachKhuVucUuTienComponent, ThemKhuVucUuTienComponent],
  imports: [
    CommonModule,
    KhuVucUuTienRoutingModule,
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
  providers: [KhuVucUuTienService]
})
export class KhuVucUuTienModule { }
