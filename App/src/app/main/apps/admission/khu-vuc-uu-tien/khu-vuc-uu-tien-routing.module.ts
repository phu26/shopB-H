import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhuVucUuTienComponent } from './khu-vuc-uu-tien.component';
import { DanhSachKhuVucUuTienComponent } from './danh-sach-khu-vuc-uu-tien/danh-sach-khu-vuc-uu-tien.component';
import { ThemKhuVucUuTienComponent } from './them-khu-vuc-uu-tien/them-khu-vuc-uu-tien.component';

const routes: Routes = [
  {
    path: '', component: KhuVucUuTienComponent,
    children: [
      { path: '', component: DanhSachKhuVucUuTienComponent },
      { path: ':id', component: ThemKhuVucUuTienComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhuVucUuTienRoutingModule { }
