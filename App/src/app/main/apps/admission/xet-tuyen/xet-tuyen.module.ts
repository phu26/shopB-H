import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XetTuyenRoutingModule } from './xet-tuyen-routing.module';
import { XetTuyenComponent } from './xet-tuyen.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatTableModule, MatSnackBarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DanhSachXetTuyenTheoDotTuyenSinhComponent } from './danh-sach-xet-tuyen-theo-dot-tuyen-sinh/danh-sach-xet-tuyen-theo-dot-tuyen-sinh.component';
import { XetTuyenService } from './xet-tuyen.service';

@NgModule({
  declarations: [XetTuyenComponent, DanhSachXetTuyenTheoDotTuyenSinhComponent],
  imports: [
    CommonModule,
    XetTuyenRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatSnackBarModule
  ],
  providers: [XetTuyenService
  ]
})
export class XetTuyenModule { }
