import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoSoXetTuyenRoutingModule } from './ho-so-xet-tuyen-routing.module';
import { ChiTietHoSoXetTuyenComponent } from './chi-tiet-ho-so-xet-tuyen/chi-tiet-ho-so-xet-tuyen.component';
import { HoSoXetTuyenComponent } from './ho-so-xet-tuyen.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatDialogModule, MatCheckboxModule, MatMenuModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HoSoXetTuyenService, HoSoXetTuyenThiSinhService } from './ho-so-xet-tuyen.service';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DanhSachHoSoXetTuyenThiSinhComponent, DanhSachHoSoXetTuyenComponent, DanhSachHoSoXetTuyenTheoDotComponent, BaseDanhSachHoSoXetTuyenComponent, DanhSachHoSoXetTuyenSinhVienShowComponent } from './danh-sach-ho-so-xet-tuyen/danh-sach-ho-so-xet-tuyen.component';
import { HinhThucXetTuyenService } from '../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';
import { XemThongBaoModule } from '../dot-tuyen-sinh/xem-thong-bao/xem-thong-bao.module';
import { DotTuyenSinhService } from '../dot-tuyen-sinh/dot-tuyen-sinh.service';
import { ThiSinhService } from '../thi-sinh/thi-sinh.service';

@NgModule({
  declarations: [DanhSachHoSoXetTuyenComponent
    , ChiTietHoSoXetTuyenComponent
    , HoSoXetTuyenComponent
    , DanhSachHoSoXetTuyenThiSinhComponent
    , DanhSachHoSoXetTuyenComponent
    , DanhSachHoSoXetTuyenTheoDotComponent
    , DanhSachHoSoXetTuyenSinhVienShowComponent
    , BaseDanhSachHoSoXetTuyenComponent 
  ],
  imports: [
    CommonModule,
    HoSoXetTuyenRoutingModule,
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
    MatDialogModule,
    MatCheckboxModule,
    DialogModule,
    XemThongBaoModule,
    MatMenuModule
  ],
  providers: [ HoSoXetTuyenService, HinhThucXetTuyenService ,HoSoXetTuyenThiSinhService,DotTuyenSinhService,ThiSinhService],
})
export class HoSoXetTuyenModule { }
