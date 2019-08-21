import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemDoiTuongUuTienComponent } from './them-doi-tuong-uu-tien/them-doi-tuong-uu-tien.component';
import { DanhSachDoiTuongUuTienComponent } from './danh-sach-doi-tuong-uu-tien/danh-sach-doi-tuong-uu-tien.component';
import { DoiTuongUuTienComponent } from './doi-tuong-uu-tien.component';

const routes: Routes = [
  {
    path: '',
    component: DoiTuongUuTienComponent,
    children: [
      {path: '', component: DanhSachDoiTuongUuTienComponent},
      { path: ':pageType', component: ThemDoiTuongUuTienComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoiTuongUuTienRoutingModule { }
