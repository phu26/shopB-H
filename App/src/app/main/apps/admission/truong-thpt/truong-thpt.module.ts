import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruongThptRoutingModule } from './truong-thpt-routing.module';
import { DanhSachTruongThptComponent } from './danh-sach-truong-thpt/danh-sach-truong-thpt.component';
import { TruongTHPTComponent } from './truong-thpt.component';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { TruongThptService } from './truong-thpt.service';
import { ThemTruongThptComponent } from './them-truong-thpt/them-truong-thpt.component';

import { DialogModule } from 'app/common/components/dialog/dialog.module';

@NgModule({
  declarations: [TruongTHPTComponent, DanhSachTruongThptComponent, ThemTruongThptComponent],
  imports: [
    CommonModule,
    TruongThptRoutingModule,
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
    MatDialogModule
  ],
    providers: [
      TruongThptService
    ]
})
export class TruongThptModule { }

