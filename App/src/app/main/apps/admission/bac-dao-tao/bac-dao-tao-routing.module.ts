import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacDaoTaoComponent } from './bac-dao-tao.component';
import { DanhSachBacDaoTaoComponent } from './danh-sach-bac-dao-tao/danh-sach-bac-dao-tao.component';
import { ThemBacDaoTaoComponent } from './them-bac-dao-tao/them-bac-dao-tao.component';
const routes: Routes = [
  {
    path: '',
    component: BacDaoTaoComponent,
    children: [
      { path: '', component: DanhSachBacDaoTaoComponent },
      { path: ':id', component: ThemBacDaoTaoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacDaoTaoRoutingModule { }
