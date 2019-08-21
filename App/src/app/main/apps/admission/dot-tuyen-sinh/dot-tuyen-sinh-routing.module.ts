import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DotTuyenSinhComponent } from './dot-tuyen-sinh.component';
import { DanhSachDotTuyenSinhComponent,DanhSachDotTuyenSinhQuanLyComponent } from './danh-sach-dot-tuyen-sinh/danh-sach-dot-tuyen-sinh.component';
import { ChiTietDotTuyenSinhComponent } from './chi-tiet-dot-tuyen-sinh/chi-tiet-dot-tuyen-sinh.component';
import { NoiDungThongBaoEmailComponent } from './noi-dung-thong-bao-email/noi-dung-thong-bao-email.component';
import { CongThucDiemComponent } from './chi-tiet-dot-tuyen-sinh/cong-thuc-diem/cong-thuc-diem.component';

const routes: Routes = [
  {
    path: '',
    component: DotTuyenSinhComponent,
    children: [
      { path: '', redirectTo: 'quan-ly', pathMatch: 'full'},
      { path: 'admin', component:   DanhSachDotTuyenSinhComponent },
      { path: 'quan-ly', component: DanhSachDotTuyenSinhQuanLyComponent },
      // { path: 'cong-thuc', component: CongThucDiemComponent },
      { path: 'thong-bao-email/:id/:loai', component: NoiDungThongBaoEmailComponent },
      { path: ':id', component: ChiTietDotTuyenSinhComponent }
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotTuyenSinhRoutingModule { }
