import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhaoSatRoutingModule } from './khao-sat-routing.module';
import { DanhSachKhaoSatComponent } from './danh-sach-khao-sat/danh-sach-khao-sat.component';
import { KhaoSatComponent } from './khao-sat.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { KhaoSatService } from './khao-sat.service';
import { ThemKhaoSatComponent } from './them-khao-sat/them-khao-sat.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';

@NgModule({
  declarations: [KhaoSatComponent, DanhSachKhaoSatComponent, ThemKhaoSatComponent],
  imports: [
    CommonModule,
    KhaoSatRoutingModule,
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
    KhaoSatService
  ]
})
export class KhaoSatModule { }
