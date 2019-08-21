import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThiSinhRoutingModule } from './thi-sinh-routing.module';
import { ThiSinhComponent } from './thi-sinh.component';
import { ThiSinhItemComponent } from './thi-sinh-item/thi-sinh-item.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { DanhSachThiSinhComponent } from './danh-sach-thi-sinh/danh-sach-thi-sinh.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, 
  MatSnackBarModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatTabsModule } from '@angular/material';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { ThiSinhService } from './thi-sinh.service';
import { DoiMatKhauComponent } from './doi-mat-khau/doi-mat-khau.component';
@NgModule({
  declarations: [ThiSinhComponent, ThiSinhItemComponent, DanhSachThiSinhComponent, DoiMatKhauComponent],
  imports: [
    CommonModule,
    ThiSinhRoutingModule,
    FuseSharedModule,
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
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [ThiSinhService]
})
export class ThiSinhModule { }
