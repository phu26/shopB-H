import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruongTHPTComponent } from './truong-thpt.component';
import { DanhSachTruongThptComponent } from './danh-sach-truong-thpt/danh-sach-truong-thpt.component';
import { ThemTruongThptComponent } from './them-truong-thpt/them-truong-thpt.component';

const routes: Routes = [
  {
    path: '',
    component: TruongTHPTComponent,
    children: [
      { path: '', component: DanhSachTruongThptComponent },
      { path: ':id', component: ThemTruongThptComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruongThptRoutingModule { }
