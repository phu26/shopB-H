import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XetTuyenComponent } from './xet-tuyen.component';
import { DanhSachXetTuyenTheoDotTuyenSinhComponent } from './danh-sach-xet-tuyen-theo-dot-tuyen-sinh/danh-sach-xet-tuyen-theo-dot-tuyen-sinh.component';

const routes: Routes = [
  {
    path: '',
    component: XetTuyenComponent,
    children: [
       { path: ':dotTuyenSinhId/:tenDotTuyenSinh', component: DanhSachXetTuyenTheoDotTuyenSinhComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XetTuyenRoutingModule { }
