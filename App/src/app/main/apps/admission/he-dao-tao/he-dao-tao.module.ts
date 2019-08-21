import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeDaoTaoRoutingModule } from './he-dao-tao-routing.module';
import { HeDaoTaoComponent } from './he-dao-tao.component';
import { DanhSachHeDaoTaoComponent } from './danh-sach-he-dao-tao/danh-sach-he-dao-tao.component';
import { HeDaoTaoService } from './he-dao-tao.service';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { ChiTietHeDaoTaoComponent } from './chi-tiet-he-dao-tao/chi-tiet-he-dao-tao.component';

@NgModule({
  declarations: [HeDaoTaoComponent, DanhSachHeDaoTaoComponent, ChiTietHeDaoTaoComponent],
  imports: [
    CommonModule,
    HeDaoTaoRoutingModule,
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
  providers: [
    HeDaoTaoService
  ]
})
export class HeDaoTaoModule { }
