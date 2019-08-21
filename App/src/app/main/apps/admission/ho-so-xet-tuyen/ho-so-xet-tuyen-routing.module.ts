import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoSoXetTuyenComponent } from './ho-so-xet-tuyen.component';
import { ChiTietHoSoXetTuyenComponent } from './chi-tiet-ho-so-xet-tuyen/chi-tiet-ho-so-xet-tuyen.component';
import { DanhSachHoSoXetTuyenComponent, DanhSachHoSoXetTuyenThiSinhComponent, DanhSachHoSoXetTuyenTheoDotComponent } from './danh-sach-ho-so-xet-tuyen/danh-sach-ho-so-xet-tuyen.component';


const routes: Routes = [
  {
    path: '',
    component: HoSoXetTuyenComponent,
    children: [
      { path: '', redirectTo:'dang-ky'},
      { path: 'quan-tri', component: DanhSachHoSoXetTuyenComponent },
      { path: 'dang-ky', component: DanhSachHoSoXetTuyenThiSinhComponent },
      { path: 'theo-dot/:hinhthucxettuyenid/:dottuyensinhid', component: DanhSachHoSoXetTuyenTheoDotComponent },
      { path: ':id', component: ChiTietHoSoXetTuyenComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoSoXetTuyenRoutingModule { }
