import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NganhDaoTaoComponent } from './nganh-dao-tao.component';
import { DanhSachNganhDaoTaoComponent } from './danh-sach-nganh-dao-tao/danh-sach-nganh-dao-tao.component';
import { ThemNganhDaoTaoComponent } from './them-nganh-dao-tao/them-nganh-dao-tao.component';

const routes: Routes = [
  {
    path: '',
    component: NganhDaoTaoComponent,
    children: [
      { 
        path: '', 
        component: DanhSachNganhDaoTaoComponent 
      },
      {
        path: ':id',
        component: ThemNganhDaoTaoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NganhDaoTaoRoutingModule { }
