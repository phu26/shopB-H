import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionComponent } from './admission.component';

const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent,
    children: [
      { path: '', redirectTo: 'dot-tuyen-sinh' ,pathMatch:'full'},
      { path: 'dot-tuyen-sinh', loadChildren: './dot-tuyen-sinh/dot-tuyen-sinh.module#DotTuyenSinhModule' },
      { path: 'truong', loadChildren: './truong-thpt/truong-thpt.module#TruongThptModule' },
      { path: 'khao-sat', loadChildren: './khao-sat/khao-sat.module#KhaoSatModule' },
      { path: 'nganh-dao-tao', loadChildren: './nganh-dao-tao/nganh-dao-tao.module#NganhDaoTaoModule' },
      { path: 'dot-tuyen-sinh', loadChildren: './dot-tuyen-sinh/dot-tuyen-sinh.module#DotTuyenSinhModule' }, 
      { path: 'truong-thpt', loadChildren: './truong-thpt/truong-thpt.module#TruongThptModule' },
      { path: 'doi-tuong-uu-tien', loadChildren: './doi-tuong-uu-tien/doi-tuong-uu-tien.module#DoiTuongUuTienModule'},
      { path: 'thi-sinh', loadChildren: './thi-sinh/thi-sinh.module#ThiSinhModule' },
      { path: 'dot-xet-tuyen', loadChildren:'./dot-xet-tuyen/dot-xet-tuyen.module#DotXetTuyenModule'},
      { path: 'truong-thpt', loadChildren: './truong-thpt/truong-thpt.module#TruongThptModule' },
      { path: 'quan-huyen', loadChildren: './quan-huyen/quan-huyen.module#QuanHuyenModule'},
      { path: 'ho-so-xet-tuyen', loadChildren: './ho-so-xet-tuyen/ho-so-xet-tuyen.module#HoSoXetTuyenModule'},
      { path: 'nguyen-vong', loadChildren: './nguyen-vong/nguyen-vong.module#NguyenVongModule'},
      { path: 'dang-ky', loadChildren: './dang-ky/dang-ky.module#DangKyModule'},
      { path: 'to-hop-cot-diem', loadChildren: './to-hop-cot-diem/to-hop-cot-diem.module#ToHopCotDiemModule'},
      { path: 'cot-diem', loadChildren: './cot-diem/cot-diem.module#CotDiemModule'},
      { path: 'khu-vuc-uu-tien', loadChildren: './khu-vuc-uu-tien/khu-vuc-uu-tien.module#KhuVucUuTienModule'},
      { path: 'bac-dao-tao', loadChildren: './bac-dao-tao/bac-dao-tao.module#BacDaoTaoModule'},
      { path: 'he-dao-tao', loadChildren: './he-dao-tao/he-dao-tao.module#HeDaoTaoModule'},
      { path: 'hinh-thuc-xet-tuyen', loadChildren: './hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.module#HinhThucXetTuyenModule'},
      { path: 'xet-tuyen', loadChildren: './xet-tuyen/xet-tuyen.module#XetTuyenModule'},
      { path: 'uploadfiles', loadChildren: './upload-files/upload-files.module#UploadFilesModule'},
      { path: 'signalr', loadChildren: './signalr/signalr.module#SignalrModule'},
      { path: 'thong-bao-ngoai', loadChildren: './thong-bao-ngoai/thong-bao-ngoai.module#ThongBaoNgoaiModule'},
      {
        path: '**',
        redirectTo: 'page-not-found',
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
