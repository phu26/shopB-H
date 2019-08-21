import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanHuyenComponent } from './quan-huyen.component';
import { QuanLyQuanHuyenComponent,QuanLyQuanHuyenComponentDialog } from './quan-ly-quan-huyen/quan-ly-quan-huyen.component';
import { QuanLyDSDonViHanhChinhComponent } from './quan-ly-dsdon-vi-hanh-chinh/quan-ly-dsdon-vi-hanh-chinh.component';



//const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    component: QuanHuyenComponent,
    children: [
      { path: '', component: QuanLyDSDonViHanhChinhComponent },
      // { path: '', component: QuanLyDVHanhChinhComponent },
      // { path: '', component: QuanLyQuanHuyenComponentDialog }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanHuyenRoutingModule { }
