import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhSachNganhDaoTaoListComponent, DanhSachNganhDaoTaoModalComponent, DanhSachNganhDaoTaoComponent } from './danh-sach-nganh-dao-tao.component';
import { NganhDaoTaoService } from '../nganh-dao-tao.service';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatSnackBarModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatListModule, MatTooltipModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DanhSachNganhDaoTaoModalComponent,DanhSachNganhDaoTaoListComponent,DanhSachNganhDaoTaoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    FuseSharedModule,
    FuseWidgetModule,
    DialogModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatTooltipModule,
    MatListModule
  ],
  entryComponents:[DanhSachNganhDaoTaoModalComponent],
  providers:[NganhDaoTaoService],
  exports:[DanhSachNganhDaoTaoModalComponent,DanhSachNganhDaoTaoListComponent,DanhSachNganhDaoTaoComponent]
})
export class DanhSachNganhDaoTaoModule { }
