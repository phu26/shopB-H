import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacDaoTaoRoutingModule } from './bac-dao-tao-routing.module';
import { BacDaoTaoComponent } from './bac-dao-tao.component';
import { DanhSachBacDaoTaoComponent } from './danh-sach-bac-dao-tao/danh-sach-bac-dao-tao.component';
import {
  MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatRadioModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { BacDaoTaoService } from './bac-dao-tao.service';

import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { ThemBacDaoTaoComponent } from './them-bac-dao-tao/them-bac-dao-tao.component';
@NgModule({
  declarations: [BacDaoTaoComponent, DanhSachBacDaoTaoComponent, ThemBacDaoTaoComponent],
  imports: [
    CommonModule,
    BacDaoTaoRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    FuseSharedModule,
    FuseWidgetModule,
    DialogModule,
    MatDialogModule
  ],
  providers: [
    BacDaoTaoService
  ]
})
export class BacDaoTaoModule { }
