import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachDotTuyenSinhShowComponent } from '../admission/dot-tuyen-sinh/danh-sach-dot-tuyen-sinh/danh-sach-dot-tuyen-sinh.component';
import { FormXetTuyenHocBaAdminYersinComponent, FormXetTuyenVanBang2NEUComponent, FormThiLienThongCaoDangLenDaiHocNEUComponent, FormXetTuyenDHChinhQuyKetHopNEUComponent } from '../admission/dang-ky/form-xet-tuyen/form-xet-tuyen.component';
import { DanhSachHoSoXetTuyenSinhVienShowComponent } from '../admission/ho-so-xet-tuyen/danh-sach-ho-so-xet-tuyen/danh-sach-ho-so-xet-tuyen.component';
import { DoiMatKhauComponent } from '../admission/thi-sinh/doi-mat-khau/doi-mat-khau.component';
import { YersinComponent } from '../admission/dang-ky/form-xet-tuyen/yersin/yersin.component';
import { LawComponent, LawBoSungThongTinComponent } from '../admission/dang-ky/form-xet-tuyen/law/law.component';
import { RoleGuardService } from 'app/role-guard.service';
import { HiuComponent } from '../admission/dang-ky/form-xet-tuyen/hiu/hiu.component';
import { QnuComponent, QnuLienThongComponent, QnuSauDaiHocComponent } from '../admission/dang-ky/form-xet-tuyen/qnu/qnu.component';
import { TraCuuComponent } from '../admission/tra-cuu/tra-cuu.component';
import { DnpuComponent, DnpuLienThongComponent, DnuSauDaiHocComponent } from '../admission/dang-ky/form-xet-tuyen/dnpu/dnpu.component';
import { ThongBaoComponent } from '../admission/thong-bao/thong-bao.component';

const routes: Routes = [
  {
    path: '',
    component: DanhSachDotTuyenSinhShowComponent,

  },
  {
    path: 'tra-cuu',
    component: TraCuuComponent,

  }
  , {
    path: 'profile/ho-so-xet-tuyen/:thiSinhId/:hoSoXetTuyenId',
    component: DanhSachHoSoXetTuyenSinhVienShowComponent,
    canActivate: [RoleGuardService]
  }
  , {
    path: 'profile/doi-mat-khau/:thiSinhId',
    component: DoiMatKhauComponent
  }
  , {
    path: 'thong-bao',
    component: ThongBaoComponent
  }
  // , {
  //   path: 'tra-cuu',
  //   component: TraCuuComponent
  // }
  // , {
  //   path: 'dang-ky/chonmonthi/:id/:dotTuyenSinhId',
  //   component: FormXetTuyenKTNangLucComponent
  // }
  // ,
  // {
  //   path: 'dang-ky/nhapdiem/:id/:dotTuyenSinhId',
  //   component: FormXetTuyenHocBaComponent
  // },
  // {
  //   path:'profile/form-xet-tuyen-dai-hoc/nhapdiem/:id/:dotTuyenSinhId',
  //   component: FormXetTuyenHocBaComponent
  // },
  // {
  //   path:'profile/form-xet-tuyen-dai-hoc/chonmonthi/:id/:dotTuyenSinhId',
  //   component: FormXetTuyenKTNangLucComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }

  /////////////////////
  // phuongThucId{ Id=2, Ten="Xét văn bằng 2" },
  // phuongThucId{ Id=14, Ten="Thi đánh giá năng lực" },
  // phuongThucId{ Id=1, Ten="Xét học bạ THPT" },
  // phuongThucId{ Id=5, Ten="Xét HS tốt CTTHPT quốc tế" },
  // phuongThucId{ Id=6, Ten="Kết quả kỳ thi SAT" }
  // phuongThucId{ Id=17, Ten="Thi liên thông Cao Đẳng lên Đại học" }
  // phuongThucId{ Id=20, Ten="Thi liên thông Cao Đẳng lên Đại học" }
  // phuongThucId{ Id=11, Ten="Xét tuyển bằng học bạ" }
  // phuongThucId{ Id=12, Ten="Xét tuyển bằng điểm thi SAT hoặc THPTQG" }

  //==================================HIU============================
  , { path: 'dang-ky/1/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent }
  //  // { path: 'form-xet-tuyen-dai-hoc/:phuongThucId/vanbang2/:id/:dotTuyenSinhId', component: FormXetTuyenVanBang2Component  },
  , { path: 'dang-ky/14/chonmonthi/:id/:dotTuyenSinhId', component: HiuComponent } //FormXetTuyenKTNangLucAdminComponent

 , { path: 'dang-ky/5/chonmonthi/:id/:dotTuyenSinhId', component: HiuComponent }
  ,{ path: 'dang-ky/6/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent }
  ,{ path: 'dang-ky/15/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent }

  //=====================================NEU
  , { path: 'dang-ky/2/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenVanBang2NEUComponent }
  , { path: 'dang-ky/17/chonmonthi/:id/:dotTuyenSinhId', component: FormThiLienThongCaoDangLenDaiHocNEUComponent }
  , { path: 'dang-ky/20/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenDHChinhQuyKetHopNEUComponent }

  //=============LAW====================
  , { path: 'dang-ky/22/nhapdiem/:id/:dotTuyenSinhId', component: LawComponent }
  , { path: 'dang-ky/22/chinhsuathongtin/:id/:dotTuyenSinhId', component: LawBoSungThongTinComponent },
  //==============================Yersin=========================
 // { path: 'dang-ky/11/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenHocBaAdminYersinComponent },
  { path: 'dang-ky/11/nhapdiem/:id/:dotTuyenSinhId', component: YersinComponent },
  { path: 'dang-ky/12/nhapdiem/:id/:dotTuyenSinhId', component: YersinComponent },
  { path: 'dang-ky/19/nhapdiem/:id/:dotTuyenSinhId', component: YersinComponent },
  { path: 'dang-ky/21/nhapdiem/:id/:dotTuyenSinhId', component: YersinComponent },

  //=============QNU====================
  { path: 'dang-ky/30/nhapdiem/:id/:dotTuyenSinhId', component: QnuComponent },
  { path: 'dang-ky/31/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
  { path: 'dang-ky/32/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
  { path: 'dang-ky/33/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
  { path: 'dang-ky/34/nhapdiem/:id/:dotTuyenSinhId', component: QnuComponent },
  { path: 'dang-ky/35/nhapdiem/:id/:dotTuyenSinhId', component: QnuSauDaiHocComponent },

  //=============DNU====================
  { path: 'dang-ky/40/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
  { path: 'dang-ky/41/chonmonthi/:id/:dotTuyenSinhId', component: DnpuComponent },
  { path: 'dang-ky/42/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
  { path: 'dang-ky/43/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
  { path: 'dang-ky/44/nhapdiem/:id/:dotTuyenSinhId', component: DnpuLienThongComponent },
  { path: 'dang-ky/45/nhapdiem/:id/:dotTuyenSinhId', component: DnuSauDaiHocComponent },
  { path: 'dang-ky/46/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },

];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuyenSinhRoutingModule { }
