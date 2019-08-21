import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuyenSinhRoutingModule } from './tuyen-sinh-routing.module';
import { DotTuyenSinhService } from '../admission/dot-tuyen-sinh/dot-tuyen-sinh.service';
import { FormDangKyModule } from '../admission/dang-ky/form-dang-ky/form-dang-ky.module';
import { FormXetTuyenModule } from '../admission/dang-ky/form-xet-tuyen/form-xet-tuyen.module';
import { HoSoXetTuyenModule } from '../admission/ho-so-xet-tuyen/ho-so-xet-tuyen.module';
import { ThiSinhModule } from '../admission/thi-sinh/thi-sinh.module';
import { DanhSachDotTuyenSinhShowModule } from '../admission/dot-tuyen-sinh/danh-sach-dot-tuyen-sinh/danh-sach-dot-tuyen-sinh-show/danh-sach-dot-tuyen-sinh-show.module';
import { DanhSachDotTuyenSinhModule } from '../admission/dot-tuyen-sinh/danh-sach-dot-tuyen-sinh/danh-sach-dot-tuyen-sinh.module';
import { TraCuuModule } from '../admission/tra-cuu/tra-cuu.module';
import { ThongBaoComponent } from '../admission/thong-bao/thong-bao.component';
import { ThongBaoModule } from '../admission/thong-bao/thong-bao.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuyenSinhRoutingModule,
    //DanhSachDotTuyenSinhModule,
    DanhSachDotTuyenSinhShowModule,
    HoSoXetTuyenModule,
    FormXetTuyenModule,
    ThiSinhModule,
    TraCuuModule,
    ThongBaoModule
  ],
  providers: [DotTuyenSinhService]
})
export class TuyenSinhModule { }
