import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotTuyenSinhRoutingModule } from './dot-tuyen-sinh-routing.module';
import { DotTuyenSinhComponent } from './dot-tuyen-sinh.component';
import { ChiTietDotTuyenSinhComponent } from './chi-tiet-dot-tuyen-sinh/chi-tiet-dot-tuyen-sinh.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatDialogModule, MatListModule, MatGridListModule, MatDatepickerModule, MatExpansionModule, MatTab, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DotTuyenSinhService, PersonValidatorService } from './dot-tuyen-sinh.service';
import { HeDaoTaoService } from '../he-dao-tao/he-dao-tao.service';
import { BacDaoTaoService } from '../bac-dao-tao/bac-dao-tao.service';
import { HinhThucXetTuyenService } from '../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';
import { DanhSachNganhDaoTaoModule } from '../nganh-dao-tao/danh-sach-nganh-dao-tao/danh-sach-nganh-dao-tao.module';
import { DanhSachToHopCotDiemModule } from '../to-hop-cot-diem/danh-sach-to-hop-cot-diem/danh-sach-to-hop-cot-diem.module';
import { DanhSachDotTuyenSinhModule } from './danh-sach-dot-tuyen-sinh/danh-sach-dot-tuyen-sinh.module';
import { DanhSachNganhDaoTaoModalComponent } from '../nganh-dao-tao/danh-sach-nganh-dao-tao/danh-sach-nganh-dao-tao.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoiDungThongBaoEmailComponent } from './noi-dung-thong-bao-email/noi-dung-thong-bao-email.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CongThucDiemComponent } from './chi-tiet-dot-tuyen-sinh/cong-thuc-diem/cong-thuc-diem.component';
import { LoaiDiemModule } from '../loai-diem/loai-diem.module';
import { LoaiDiemService } from '../loai-diem/loai-diem.service';
import { CongThucDiemModule } from './chi-tiet-dot-tuyen-sinh/cong-thuc-diem/cong-thuc-diem.module';
import { ReactiveFormsModule } from '@angular/forms';
import { XemThongBaoComponent } from './xem-thong-bao/xem-thong-bao.component';

@NgModule({
  declarations: [DotTuyenSinhComponent,ChiTietDotTuyenSinhComponent, NoiDungThongBaoEmailComponent],
  imports: [
    CommonModule,
    DotTuyenSinhRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    FuseSharedModule,
    FuseWidgetModule,
    MatDialogModule,
    MatTabsModule,
    DialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    DanhSachNganhDaoTaoModule,
    DanhSachToHopCotDiemModule,
    DanhSachDotTuyenSinhModule,
    DanhSachNganhDaoTaoModule,
    AngularEditorModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    CongThucDiemModule,
    ReactiveFormsModule
  ],
  providers: [ DotTuyenSinhService, HeDaoTaoService, BacDaoTaoService, HinhThucXetTuyenService,PersonValidatorService,LoaiDiemService],
  entryComponents:[DanhSachNganhDaoTaoModalComponent,CongThucDiemComponent]
})
export class DotTuyenSinhModule { }
