import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhaoSatComponent } from './khao-sat.component';
import { DanhSachKhaoSatComponent } from './danh-sach-khao-sat/danh-sach-khao-sat.component';
import { ThemKhaoSatComponent } from './them-khao-sat/them-khao-sat.component';

const routes: Routes = [
  {
    path: '',
    component: KhaoSatComponent,
    children: [
      { path: '', component: DanhSachKhaoSatComponent },
      { path: ':id', component: ThemKhaoSatComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhaoSatRoutingModule { }
