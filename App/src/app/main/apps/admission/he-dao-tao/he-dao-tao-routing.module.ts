import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeDaoTaoComponent } from './he-dao-tao.component';
import { DanhSachHeDaoTaoComponent } from './danh-sach-he-dao-tao/danh-sach-he-dao-tao.component';
import { ChiTietHeDaoTaoComponent } from './chi-tiet-he-dao-tao/chi-tiet-he-dao-tao.component';

const routes: Routes = [
  {
    path: '',
    component: HeDaoTaoComponent,
    children: [
      { path: '', component: DanhSachHeDaoTaoComponent },
      { path: ':id', component: ChiTietHeDaoTaoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeDaoTaoRoutingModule { }
