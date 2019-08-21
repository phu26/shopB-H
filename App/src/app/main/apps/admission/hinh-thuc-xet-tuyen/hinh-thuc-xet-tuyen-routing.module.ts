import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachHinhThucXetTuyenComponent } from './danh-sach-hinh-thuc-xet-tuyen/danh-sach-hinh-thuc-xet-tuyen.component';
import { ThemHinhThucXetTuyenComponent } from './them-hinh-thuc-xet-tuyen/them-hinh-thuc-xet-tuyen.component';

const routes: Routes = [
  { path: '', component: DanhSachHinhThucXetTuyenComponent },
  { path: ':id', component: ThemHinhThucXetTuyenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HinhThucXetTuyenRoutingModule { }
