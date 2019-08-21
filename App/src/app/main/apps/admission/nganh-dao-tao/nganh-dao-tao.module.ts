import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NganhDaoTaoRoutingModule } from './nganh-dao-tao-routing.module';
import { NganhDaoTaoComponent } from './nganh-dao-tao.component';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
 MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { NganhDaoTaoService } from './nganh-dao-tao.service';
import { ThemNganhDaoTaoComponent } from './them-nganh-dao-tao/them-nganh-dao-tao.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DanhSachNganhDaoTaoModule } from './danh-sach-nganh-dao-tao/danh-sach-nganh-dao-tao.module';



@NgModule({
  declarations: [NganhDaoTaoComponent, ThemNganhDaoTaoComponent],
  imports: [
    CommonModule,
    NganhDaoTaoRoutingModule,
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
    DanhSachNganhDaoTaoModule
  ],
  providers: [NganhDaoTaoService
  ]
})
export class NganhDaoTaoModule { }
